import { useState, useEffect } from 'react';
import './App.css';
import _server from './server';
import { GameRulesService } from './testGameRulesService';

import RoomEnter from './components/RoomEnter';
import WaitingRoom from './components/WaitingRoom';
import GamePlay from './components/GamePlay';
import GameOver from './components/GameEnd';
import { GAME_ACTIONS, GAME_STATUS } from './constants/constants';

import { mapGameSettings, mapPlayers, mapCards } from './mappers';
import GameStarting from './components/GameStarting';


const GAME_SETTINGS_DEFAULT_STATE = {
  gameStatus: null,
  playerPositions: {},
  sessionPositionsIndex: {},
  scores: [],
  turnPosition: 0,
  round: 1
}

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState({});
  const [waitingRoomPlayers, setWaitingRoomPlayers] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  // New
  const [gameSettings, setGameSettings] = useState(GAME_SETTINGS_DEFAULT_STATE);

  // useEffect(() => {
  //   const deckCards = [
  //     { id: 1, name: '2', suit: 'Hearts', value: 13 },
  // ];

  // const playerCards = [
  //   { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
  //   { id: 1, name: '2', suit: 'Hearts', value: 13 },
  //   { id: 2, name: '3', suit: 'Hearts', value: 1 },
  //   { id: 3, name: '4', suit: 'Hearts', value: 2 },
  //   { id: 4, name: '5', suit: 'Hearts', value: 3 },
  //   { id: 5, name: '6', suit: 'Hearts', value: 4 },
  //   { id: 6, name: '7', suit: 'Hearts', value: 5 },
  //   { id: 7, name: '8', suit: 'Hearts', value: 6 },
  //   { id: 8, name: '9', suit: 'Hearts', value: 7 },
  //   { id: 9, name: '10', suit: 'Hearts', value: 8 },
  //   { id: 10, name: 'Jack', suit: 'Hearts', value: 9 },
  //   { id: 11, name: 'Queen', suit: 'Hearts', value: 10 },
  //   { id: 12, name: 'King', suit: 'Hearts', value: 11 },
  //   { id: 13, name: 'Ace', suit: 'Hearts', value: 12 },
  //   { id: 14, name: '2', suit: 'Diamonds', value: 13 },
  //   { id: 15, name: '3', suit: 'Diamonds', value: 1 },
  //   { id: 16, name: '4', suit: 'Diamonds', value: 2 },
  //   { id: 17, name: '5', suit: 'Diamonds', value: 3 },
  //   { id: 18, name: '6', suit: 'Diamonds', value: 4 },
  //   { id: 19, name: '7', suit: 'Diamonds', value: 5 },
  //   { id: 20, name: '8', suit: 'Diamonds', value: 6 },
  //   { id: 21, name: '9', suit: 'Diamonds', value: 7 },
  //   { id: 22, name: '10', suit: 'Diamonds', value: 8 },
  //   { id: 23, name: 'Jack', suit: 'Diamonds', value: 9 },
  //   { id: 24, name: 'Queen', suit: 'Diamonds', value: 10 },
  //   { id: 25, name: 'King', suit: 'Diamonds', value: 11 },
  //   { id: 26, name: 'Ace', suit: 'Diamonds', value: 12 },
  // ];


  //   const response = GameRulesService.adjustAceAndTwoValueIfNeeded(playerCards);
  //   console.log("RESPONSE:", response);

  // }, [])

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

    room.onMessage(GAME_ACTIONS.SWAPPED, (message) => {
      console.log("SWAPPED");
      console.log(message);
    })

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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <WaitingRoom waitingRoomPlayers={waitingRoomPlayers} />
        </div>
      }
      {gameSettings.gameStatus === GAME_STATUS.STARTING &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <GameStarting />
        </div>
      }
      {(gameSettings.gameStatus === GAME_STATUS.PLAYING || gameSettings.gameStatus === GAME_STATUS.SWAPPING) &&
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
      {gameSettings.gameStatus === GAME_STATUS.ROUND_END &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <GameOver scores={gameSettings.scores} />
        </div>
      }
    </div>
  );
}

export default App;
