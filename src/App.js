import { useState, useEffect } from 'react';
import './App.css';
import _server from './server';
import { GameRulesService } from './testGameRulesService';

import RoomEnter from './components/RoomEnter';
import WaitingRoom from './components/WaitingRoom';
import GamePlay from './components/GamePlay';
import GameOver from './components/GameEnd';
import { GAME_ACTIONS, GAME_STATUS, GAME_TYPES, TIERS } from './constants/constants';

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
  const [gameType, setGameType] = useState(GAME_TYPES.GAME_21);
  const [selectedTire, setSelectedTire] = useState(TIERS[0].id.toString());
  const [betId, setBetId] = useState('');
  const [invitedTeamId, setInvitedTeamId] = useState(null);
  const [invitedRoomId, setInvitedRoomId] = useState(null);

  // provider murlani

  const testTokens = {
    1: {
      name: 'yllipetrovci',
      tireId: 1,
      betId: 'f33925f6-048b-4351-9d14-d06f99687193', //single
      token:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI5VDE3OjI2OjI4LjM5M1oiLCJlbWFpbCI6InlsbGlwZXRyb3ZjaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJQZXRyb3ZjaSIsImdpdmVuX25hbWUiOiJZbGxpIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTEzODczMzk1OTUyMTU4MDcxNjI1IiwidXNlcl9pZCI6IjExMzg3MzM5NTk1MjE1ODA3MTYyNSJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoiWWxsaSBQZXRyb3ZjaSIsIm5pY2tuYW1lIjoieWxsaXBldHJvdmNpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lLTHZxMFphV01PS00yc25SWHJBa2NpWFYyRW5kVGloSF9iSGRBamZPd0pBUC1QZz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTA5LTEyVDE2OjUyOjI1LjU3OVoiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMTM4NzMzOTU5NTIxNTgwNzE2MjUiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTM4NzMzOTU5NTIxNTgwNzE2MjUiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjYxNTk5NDYsImV4cCI6MTcyNjI0NjM0Niwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.NOdS2f_t_PMgeFaGKl5QD7p_t2v1sEk9E_kbfF7CAqoKmlgm00lt5REncB8NjfHnwT_6TmrvFncqHXSxipOtUwRB5pMG5HcPT2ncXxeuZJ_55C5lUNWjsFK9tLhaOrFkFTynq_t8c2xkc6x5jSz32pgXOzT5ojYqUoNiU6_tQgOWQvcWgqYGw1fdYimCtBkjLQ5utMHnZUQNwsi5whUv_qqaCExNY3Mo6nbbrj9-8Cc-RVXkStrLiwxwOg-Ba566OybnjCBavG2ZyRJObWrdUNnKW6Lg_Oe14g8AXhx9sc1SVMNbVPzYQTh1OHWrvSep2RlaNrqVfWvwKCjRH9sUOA"
    },
    2: {
      name: "yllipetrovcidev",
      tireId: 1,
      betId: "fc2a1cb8-a32f-484f-8b69-8907ebc68539", //single
      token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjE0OjI1LjM5NFoiLCJlbWFpbCI6InlsbGlwZXRyb3ZjaWRldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJwZXRyb3ZjaSIsImdpdmVuX25hbWUiOiJ5bGxpIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTAzNzc3MzU5MDUyMDkzODcwOTkxIiwidXNlcl9pZCI6IjEwMzc3NzM1OTA1MjA5Mzg3MDk5MSJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoieWxsaSBwZXRyb3ZjaSIsIm5pY2tuYW1lIjoieWxsaXBldHJvdmNpZGV2IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lQYndUUkNzeVd4eGlSVklxUVNoSHZxWmdJOTdlMU90ZzloZGpzZi11Y295MTczQT1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTA5LTEyVDE2OjUzOjMxLjg5M1oiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMDM3NzczNTkwNTIwOTM4NzA5OTEiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM3NzczNTkwNTIwOTM4NzA5OTEiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjYxNjAwMTIsImV4cCI6MTcyNjI0NjQxMiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.PugchGZT5JTPUHw8H7GIEPZvO7rxclmUheeF9BjDsoFoByGA_h05lsscPg4TA4CRiAfbBemPuhYg0O9MeoiP44fvRuTiQ83lrQNrsye-hedMgN4msm85c7f9Ij2woe-8lexnPF20ASkEC-3I6JZIf6phXkiefp-40PRHKvQCst-Zzxu5-Cn7bbpT-mpatPMTGpcvLvWchIqugWqtWNBSG7OxFW7vT8lpAjAYKxZLLGD3BXrs2wwc3z8lUgHZbUVabp1MoQP07S8v9EJ7Ns7XTDaaSp0zmNKKsTuWbPpsOeza45jDbGU0dNuKeCyGw2y9IzdqJj4vjztk20qKy4aC3w"
    },
    3: {
      name: "mechanicmayhemm",
      tireId: 1,
      betId: '9683f0b8-92b6-4377-8dce-0c88b51b61e0',//single
      token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjE1OjQxLjE1MVoiLCJlbWFpbCI6Im1lY2hhbmljbWF5aGVtbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJNYXloZW0iLCJnaXZlbl9uYW1lIjoiTWVjaGFuaWMiLCJpZGVudGl0aWVzIjpbeyJjb25uZWN0aW9uIjoiZ29vZ2xlLW9hdXRoMiIsImlzU29jaWFsIjp0cnVlLCJwcm92aWRlciI6Imdvb2dsZS1vYXV0aDIiLCJ1c2VySWQiOiIxMTQ0OTc4NjA4NTQ2NDExOTYwMDkiLCJ1c2VyX2lkIjoiMTE0NDk3ODYwODU0NjQxMTk2MDA5In1dLCJtdWx0aWZhY3RvciI6W10sIm5hbWUiOiJNZWNoYW5pYyBNYXloZW0iLCJuaWNrbmFtZSI6Im1lY2hhbmljbWF5aGVtbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMczZRc0p0REdyN2owbFhBMWh6V3BIOHNKc0NXRS1CSFI0VnhVRE5US3BSY25FZlE9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNC0wOS0xMlQxNjo1Mzo1My45NjZaIiwidXNlcl9pZCI6Imdvb2dsZS1vYXV0aDJ8MTE0NDk3ODYwODU0NjQxMTk2MDA5IiwidXNlcl9tZXRhZGF0YSI6e319LCJpc3MiOiJodHRwczovL211cmxhbmkuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0NDk3ODYwODU0NjQxMTk2MDA5IiwiYXVkIjpbImRldi5tdXJsYW5pLmNvbSIsImh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzI2MTYwMDM0LCJleHAiOjE3MjYyNDY0MzQsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcGhvbmUiLCJhenAiOiJMWGpBTVdzOXlxcHFBcW5Nb09zZEw3Q2M2YmRudDlkYiJ9.EMStRI-6qNpBB3CzxKLv-Tn-8Ho2A0TkbK5w5ugLiYPIKqITe587nxz9OdEosz14_EMit_tVARwu1Z_Jz5oOP2tw6jrzMbJ_O9oigGRB_iP7t0x-hCKi2nobCo2UhaEhCl4UAzOer2vd75Abz1P9KImLm4TNL9VbdQtCLEfEW1meatC-vtMj21UCNyqAk_cDvtF_B9uwzbufNJtvOGHXVdTBkTDMpPYrGnQyVez9kq2s_OsLwQ-DTj4g4X4mkxf2CjmFV6EDlkrOApoguHP4hCw8wPSwlIm83Sa-BND-12LPA122fte5Aw-D2iK9LGldHwnbRxyTwWb2KFfQgwjRmQ"
    },
    4: {
      name: "murlantest",
      tireId: 1,
      betId: "67222a3f-0202-4f0e-adf7-29408aadc83d",//single
      token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjIyOjM4LjgzNFoiLCJlbWFpbCI6Im11cmxhbnRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZhbWlseV9uYW1lIjoibXVybGFuIiwiZ2l2ZW5fbmFtZSI6InRlc3QtbXVybGFuIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTE3NDgzMDczNzExODM3NjI2ODM2IiwidXNlcl9pZCI6IjExNzQ4MzA3MzcxMTgzNzYyNjgzNiJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoidGVzdC1tdXJsYW4gbXVybGFuIiwibmlja25hbWUiOiJtdXJsYW50ZXN0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0s3RGEya1A0ZExZS1dsYk1oTTViT1dUQ3Z4S2hvNHJ1dm5fRWo5OU1PeFR3S285QT1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTA5LTEyVDE2OjU0OjIwLjY2OVoiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMTc0ODMwNzM3MTE4Mzc2MjY4MzYiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTc0ODMwNzM3MTE4Mzc2MjY4MzYiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MjYxNjAwNjEsImV4cCI6MTcyNjI0NjQ2MSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.U87DLW5nvwOV_Z0LntSfC5gCMGHqlVyow7ZX1JIHesDIr907UJTr5uPW2ABtcRKhb_Z6A3aL3RV6C-yXDJdaaeISqsReioybAgpYUlZjOEFRrL4x3dNFEAVcS83Gw2w5Q_YXglaUYlzCdRvDE5EFgYCwVjas-DIteLeFrC4z3OkSFTpGhi-nC8hXIeEHwwlckiEilXklcENyXAwZ39UtKN1Bk7MLqnWLQ43OjZwZEGMy8-rjwSjgCno3Z3S-5W8Nq3lx6LRtkBKcvfctvuHziHRa_oqYWeAOs4D5nwIKYGvc10JAJyHnigma-gKuTCQ8rbOoZmHYGhBvV6dEFE9w_Q"
    }
  }



  // useEffect(() => {

  //   const deckCards = [
  //     { id: 1, name: 'King', suit: 'Hearts', value: 11 },

  //   ];
  //   const playerCards = [
  //     { id: 12, name: 'King', suit: 'Hearts', value: 11 },
  //   ];


  //   const response = GameRulesService.isValidMove(deckCards,playerCards);
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

    room.onMessage(GAME_ACTIONS.INVALID_ACTION, (message) => {
      alert(message.msg);
    })

    room.onMessage(GAME_ACTIONS.INFO, (message) => {
      alert(message.msg);
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
      const token = username;

      if (invitedRoomId) {
        const teamId = parseInt(invitedTeamId);
        const roomJoined = await _server.joinRoom(invitedRoomId, { token, teamId, betId });
        syncRoom(roomJoined);
      } else {
        const roomJoinedOrCreated = await _server.joinOrCreate(gameType, { token, selectedTire, betId });
        syncRoom(roomJoinedOrCreated);
      }

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
    const teamId = queryParams.get('teamId');
    const roomId = queryParams.get('roomId');

    console.log({
      username,
      teamId,
      roomId
    });

    if (teamId) {
      setInvitedTeamId(teamId);
    }

    if (roomId) {
      setInvitedRoomId(roomId);
    }

    setUsername(testTokens[usernameParam].token)
    setBetId(testTokens[usernameParam].betId);
  }, [])

  const handleGameType = (event) => {
    setGameType(event.target.value);
  };

  const handleOnChangeTiers = (event) => {
    console.log("handleOnChangeTires: ", event.target.value)
    setSelectedTire(event.target.value);
  }

  const handleOnChangeEmojiSelection = (event) => {
    console.log('handleOnChangeEmojiSelection');
    console.log(event.target.value);
    room.send(GAME_ACTIONS.EMOJI, {
      emoji: event.target.value
    });
  }



  const queryParams = new URLSearchParams(window.location.search);
  const usernameParam = queryParams.get('username');
  return (
    <div className="App">
      <h1>Name:{testTokens[usernameParam].name}</h1>
      {gameSettings.gameStatus !== null || gameSettings.gameStatus !== GAME_STATUS.WAITING &&
        <>
          <h1>Murlan Round#{gameSettings.round}</h1>
          <h2>Game Type:{gameType}</h2>
        </>
      }
      {gameSettings.gameStatus === null &&
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }} >
          <RoomEnter invitedRoomId={invitedRoomId} room={room} selectedTire={selectedTire} handleOnChangeTiers={handleOnChangeTiers} handleGameType={handleGameType} gameType={gameType} onClickTryToReconnectHandler={onClickTryToReconnectHandler} onChangeUsernameHandle={onChangeUsernameHandle} username={username} onClickJoin={onClickJoin} />
        </div>
      }
      {gameSettings.gameStatus === GAME_STATUS.WAITING &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <WaitingRoom myPlayer={players[room.sessionId]} waitingRoomPlayers={waitingRoomPlayers} gameType={gameType} room={room} />
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
          handleOnChangeEmojiSelection={handleOnChangeEmojiSelection}
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
      {gameSettings.gameStatus === GAME_STATUS.ROUND_END || gameSettings.gameStatus === GAME_STATUS.GAME_END &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <GameOver gameEndType={gameSettings.gameStatus} scores={gameSettings.scores} />
        </div>
      }
    </div>
  );
}

export default App;
