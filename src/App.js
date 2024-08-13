import { useState, useEffect } from 'react';
import './App.css';
import _server from './server';
import RoomEnter from './components/RoomEnter';
import WaitingRoom from './components/WaitingRoom';
import GamePlay from './components/GamePlay';
import GameOver from './components/GameEnd';

import { mapGameSettings, mapPlayers, mapCards } from './mappers';

const GAME_ACTIONS = {
  PASS: 'PASS',
  PLAY: "PLAY"
}
const GAME_STATUS = {
  WAITING: "waiting",
  STARTED: "started",
  ENDED: "ended",
  PAUSE: "pause",
  SWAPING: "swaping",
}

const GAME_SETTINGS_DEFAULT_STATE = {
  gameStatus: null,
  playerPositions: {},
  sessionPositionsIndex: {},
  scores: [],
  turnPosition: 0,
  round:1
}

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState({});
  const [waitingRoomPlayers, setWaitingRoomPlayers] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  // New
  const [gameSettings, setGameSettings] = useState(GAME_SETTINGS_DEFAULT_STATE)


  const SERVER_AUTOMATIC_ACTION_TYPES = {
    PASS: 'PASS',
    PLAY_3_MATCH: "PLAY_3_MATCH",
    WIN: "WIN"
  }

  const saveReconnectionToken = (token) => {
    sessionStorage.setItem('cachedReconnectionToken', token);
  }

  const getReconnectionToken = () => {
    return sessionStorage.getItem('cachedReconnectionToken');
  }


  const onStateChangeListener = (state) => {
    console.log("onStateChangeEvent:this is the first room state!", state);

    const { players, waitingRoomPlayers } = mapPlayers(state.players);

    setPlayers(players);
    setWaitingRoomPlayers(waitingRoomPlayers)
    setGameSettings(mapGameSettings(state.game));
    setTableCards(mapCards(state.table));
  }

  const onMessageListener = (message) => {
    console.log("RECEIVED MESSAGE");
    console.log("Received message:", message);
  }

  const onErrorRoomListener = (code, message) => {
    console.log("oops, error ocurred:");
    console.log(message);
  }

  const onLeaveListener = (code) => {
    console.log("client left the room");
    setRoom(null);
    setPlayers({})
    setWaitingRoomPlayers([]);
    setSelectedCards([]);
    setGameSettings(GAME_SETTINGS_DEFAULT_STATE);

  }


  const syncRoom = (room) => {
    saveReconnectionToken(room.reconnectionToken)
    console.log("joined successfully", room);

    room.onStateChange.once(onStateChangeListener);
    room.onStateChange(onStateChangeListener);
    room.onMessage(onMessageListener);
    room.onError(onErrorRoomListener);
    room.onLeave(onLeaveListener);

    // room.onMessage(SERVER_AUTOMATIC_ACTION_TYPES.PLAY_3_MATCH, (message) => {
    //   console.log("PLAYER MATCH:", message);
    //   room.send(GAME_ACTIONS.PLAY, {
    //     cards: [
    //       {
    //         id: 41,
    //         name: "3",
    //         suit: "Spades",
    //         value: 2,
    //       }
    //     ]
    //   });
    // }}

    setSelectedCards([]);
    setRoom(room)

  }

  const onClickTryToReconnectHandler = async () => {
    try {
      const cachedReconnectionToken = await getReconnectionToken();

      const room = await _server.reconnect(cachedReconnectionToken);
      syncRoom(room);

    } catch (e) {
      console.error("join error", e);
    }
  }

  const onClickJoin = async () => {
    try {
      const room = await _server.join(username);
      syncRoom(room);
    } catch (e) {
      console.error(e);
    }
  }

  const onChangeUsernameHandle = (event) => {
    const value = event.target.value
    setUsername(value);
  }

  const onClickLeave = async () => {
    try {
      await _server.leave();
      setRoom(null);
      setPlayers([]);
    } catch (e) {
      console.error(e);
    }
  }

  const handleOnClickPass = async () => {
    room.send(GAME_ACTIONS.PASS, {});
  }

  const handleOnPlayCard = async () => {
    room.send(GAME_ACTIONS.PLAY, {
      cards: selectedCards
    });

    setSelectedCards([]);
  }

  const onClickCard = (card) => {
    setSelectedCards([...selectedCards, card]);
  }

  //TEMPORARY
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const usernameParam = queryParams.get('username');

    setUsername(usernameParam)
  }, [])

  // if (hasPlayerWin) {
  //   return <h1>You win</h1>
  // }

  return (
    <div className="App">
      <h1>Murlan Round#{gameSettings.round}</h1>
      {gameSettings.gameStatus === null &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
          <RoomEnter room={room} onClickTryToReconnectHandler={onClickTryToReconnectHandler} onChangeUsernameHandle={onChangeUsernameHandle} username={username} onClickJoin={onClickJoin} />
        </div>
      }
      {gameSettings.gameStatus === GAME_STATUS.WAITING &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
          <WaitingRoom waitingRoomPlayers={waitingRoomPlayers} />
        </div>
      }
      {(gameSettings.gameStatus === GAME_STATUS.STARTED || gameSettings.gameStatus ===  GAME_STATUS.SWAPING) &&
        <GamePlay
          gameStatus={gameSettings.gameStatus}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          sessionPositionsIndex={gameSettings.sessionPositionsIndex}
          playerPositions={gameSettings.playerPositions}
          players={{ ...players }}
          turnPosition={gameSettings.playerPositions[gameSettings.turnPosition]}
          room={room}
          handleOnClickPass={handleOnClickPass}
          handleOnPlayCard={handleOnPlayCard}
          onClickLeave={onClickLeave}
          onClickCard={onClickCard}
          tableCards={tableCards}
        />
      }
      {gameSettings.gameStatus === GAME_STATUS.ENDED &&
        <GameOver scores={gameSettings.scores} />
      }
    </div>
  );
}

export default App;
