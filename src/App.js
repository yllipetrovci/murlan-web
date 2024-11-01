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
  const [privateRoomJoinId, setPrivateRoomJoinId] = useState('');
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
  const [invitedFromId, setInvitedFromId] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);

  // provider murlani

  const testTokens = {
    1: {
      name: 'yllipetrovci',
      tireId: 1,
      betId: 'f33925f6-048b-4351-9d14-d06f99687193', //single
      token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTI5VDE3OjI2OjI4LjM5M1oiLCJlbWFpbCI6InlsbGlwZXRyb3ZjaUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJQZXRyb3ZjaSIsImdpdmVuX25hbWUiOiJZbGxpIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTEzODczMzk1OTUyMTU4MDcxNjI1IiwidXNlcl9pZCI6IjExMzg3MzM5NTk1MjE1ODA3MTYyNSJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoiWWxsaSBQZXRyb3ZjaSIsIm5pY2tuYW1lIjoieWxsaXBldHJvdmNpIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lLTHZxMFphV01PS00yc25SWHJBa2NpWFYyRW5kVGloSF9iSGRBamZPd0pBUC1QZz1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTEwLTI5VDIzOjE3OjEyLjQxN1oiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMTM4NzMzOTU5NTIxNTgwNzE2MjUiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTM4NzMzOTU5NTIxNTgwNzE2MjUiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzAyNDM4MzQsImV4cCI6MTczMDMzMDIzNCwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.eLYOr2ljUL7pz6hqrgQYhJyLLyh1l5ZNm9giHQJosJYbKGet8U9j7prQIjIv3xVvUeRCMHrAcA8fwGOKus6S0GmYHclFrj7SCDZxM2k59LCKYLZ11A9CRrlqTuaX0hCSqyGkSwCNqGh5da7hmy1X2cGlRaqSuas66pkW743gi4LoIylp9tIgLb85EtrR1rk84QYBTGDIRUCx9T5b5GY-WqXv6CBBcp-FBh6PtJADISR3xHXnVPRy7snqxT3zCb7fhLcnTel-bGkNfVs9GFT9Jjavhwitu92qu0vIeari6uQFptd2csScnxWQK26xnGnT98sk_FnE64iSUsy7Wq5upw"
    },
    2: {
      name: "yllipetrovcidev",
      tireId: 1,
      betId: "fc2a1cb8-a32f-484f-8b69-8907ebc68539", //single
      token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjE0OjI1LjM5NFoiLCJlbWFpbCI6InlsbGlwZXRyb3ZjaWRldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJwZXRyb3ZjaSIsImdpdmVuX25hbWUiOiJ5bGxpIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTAzNzc3MzU5MDUyMDkzODcwOTkxIiwidXNlcl9pZCI6IjEwMzc3NzM1OTA1MjA5Mzg3MDk5MSJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoieWxsaSBwZXRyb3ZjaSIsIm5pY2tuYW1lIjoieWxsaXBldHJvdmNpZGV2IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lQYndUUkNzeVd4eGlSVklxUVNoSHZxWmdJOTdlMU90ZzloZGpzZi11Y295MTczQT1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTEwLTI5VDIzOjE3OjUyLjc3NFoiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMDM3NzczNTkwNTIwOTM4NzA5OTEiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDM3NzczNTkwNTIwOTM4NzA5OTEiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzAyNDM4NzMsImV4cCI6MTczMDMzMDI3Mywic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.Jna4yAGA0vVtCqqOGLfBvIWnpZikfDpgLwF7w4cQLJMOPdlsuTLhttUHG_PacoJNvjdxRF8jNlSbm3i59T0t12CVHDuELqqN-s3dKtCq7LoEDF_MQHJYlsOAzn1xPAGU4otEYW6Ygxn3tRQW_lUo31KBcWIzlpCrli0oeJ0ZclIwOf6mKX1Fb8_B79uv1pRlyRYNIS5Iq8eC56W7iTswrePifNuTijNr9mIL1ov3vwY68Ap8Fj6b--hiw5-k94sU5mlpp7mPsXydy7-QWcA3WEcRYKK0MjMmaziOYEceBHQq2d7BErY4jbH7lXHHzfLny7fAOUsl89Yztculgq05bQ"
    },
    3: {
      name: "mechanicmayhemm",
      tireId: 1,
      betId: '9683f0b8-92b6-4377-8dce-0c88b51b61e0',//single
      token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjE1OjQxLjE1MVoiLCJlbWFpbCI6Im1lY2hhbmljbWF5aGVtbUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmFtaWx5X25hbWUiOiJNYXloZW0iLCJnaXZlbl9uYW1lIjoiTWVjaGFuaWMiLCJpZGVudGl0aWVzIjpbeyJjb25uZWN0aW9uIjoiZ29vZ2xlLW9hdXRoMiIsImlzU29jaWFsIjp0cnVlLCJwcm92aWRlciI6Imdvb2dsZS1vYXV0aDIiLCJ1c2VySWQiOiIxMTQ0OTc4NjA4NTQ2NDExOTYwMDkiLCJ1c2VyX2lkIjoiMTE0NDk3ODYwODU0NjQxMTk2MDA5In1dLCJtdWx0aWZhY3RvciI6W10sIm5hbWUiOiJNZWNoYW5pYyBNYXloZW0iLCJuaWNrbmFtZSI6Im1lY2hhbmljbWF5aGVtbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMczZRc0p0REdyN2owbFhBMWh6V3BIOHNKc0NXRS1CSFI0VnhVRE5US3BSY25FZlE9czk2LWMiLCJ1cGRhdGVkX2F0IjoiMjAyNC0xMC0yOVQyMzoxODoxNy4xNjJaIiwidXNlcl9pZCI6Imdvb2dsZS1vYXV0aDJ8MTE0NDk3ODYwODU0NjQxMTk2MDA5IiwidXNlcl9tZXRhZGF0YSI6e319LCJpc3MiOiJodHRwczovL211cmxhbmkuZXUuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE0NDk3ODYwODU0NjQxMTk2MDA5IiwiYXVkIjpbImRldi5tdXJsYW5pLmNvbSIsImh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNzMwMjQzODk4LCJleHAiOjE3MzAzMzAyOTgsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgcGhvbmUiLCJhenAiOiJMWGpBTVdzOXlxcHFBcW5Nb09zZEw3Q2M2YmRudDlkYiJ9.bacnXHWzQjmtuQjAg50jmNbfYrkjD0vYCgFG7WP5zFcC1MIjQnGNVQync-tuSxKQ52UiE0aFZbwm_lW7hes2pbOtvvc-EHZ8ZWi9mSbjTWpKLSdfpVQlue2DC2UIOfS9c8ttD5DxMSOfzIWEsm7aVt9NqN4HEzIIx8x_8-5kQ0oDuHkGRPk4zTJBVWzldl1a9rJ9QZ7wJ__tTS3bdSzH_nx4W7p-k_IOEfXVy3KR32TCxch8PyQTjjIWJqF2nzTlm1ehsH1ihlkvVihrBp1a3jgNQDOlSFn_hYh5lmQgA4rGsAIaFwmLadc0hLW46RuaLXo6ky0g92uCH0yryCuQeQ"
    },
    4: {
      name: "murlantest",
      isPrivate: true,
      tireId: 1,
      betId: "67222a3f-0202-4f0e-adf7-29408aadc83d",//single
      token:
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im9ybHJwTzBjUGlPTktsZDR1T01LMSJ9.eyJ1c2VyIjp7ImFwcF9tZXRhZGF0YSI6e30sImNyZWF0ZWRfYXQiOiIyMDI0LTA5LTExVDEzOjIyOjM4LjgzNFoiLCJlbWFpbCI6Im11cmxhbnRlc3RAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZhbWlseV9uYW1lIjoibXVybGFuIiwiZ2l2ZW5fbmFtZSI6InRlc3QtbXVybGFuIiwiaWRlbnRpdGllcyI6W3siY29ubmVjdGlvbiI6Imdvb2dsZS1vYXV0aDIiLCJpc1NvY2lhbCI6dHJ1ZSwicHJvdmlkZXIiOiJnb29nbGUtb2F1dGgyIiwidXNlcklkIjoiMTE3NDgzMDczNzExODM3NjI2ODM2IiwidXNlcl9pZCI6IjExNzQ4MzA3MzcxMTgzNzYyNjgzNiJ9XSwibXVsdGlmYWN0b3IiOltdLCJuYW1lIjoidGVzdC1tdXJsYW4gbXVybGFuIiwibmlja25hbWUiOiJtdXJsYW50ZXN0IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0s3RGEya1A0ZExZS1dsYk1oTTViT1dUQ3Z4S2hvNHJ1dm5fRWo5OU1PeFR3S285QT1zOTYtYyIsInVwZGF0ZWRfYXQiOiIyMDI0LTEwLTI5VDIzOjE4OjM5LjU3M1oiLCJ1c2VyX2lkIjoiZ29vZ2xlLW9hdXRoMnwxMTc0ODMwNzM3MTE4Mzc2MjY4MzYiLCJ1c2VyX21ldGFkYXRhIjp7fX0sImlzcyI6Imh0dHBzOi8vbXVybGFuaS5ldS5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMTc0ODMwNzM3MTE4Mzc2MjY4MzYiLCJhdWQiOlsiZGV2Lm11cmxhbmkuY29tIiwiaHR0cHM6Ly9tdXJsYW5pLmV1LmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE3MzAyNDM5MjEsImV4cCI6MTczMDMzMDMyMSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBwaG9uZSIsImF6cCI6IkxYakFNV3M5eXFwcUFxbk1vT3NkTDdDYzZiZG50OWRiIn0.Q3hfIQDcExtp88jmL9_yW06ivWNSO7VDKk_zmKxln5Zauuo_KNlpZ7mjkBh6yX0_mcMV5kgDQmE7LVXocSFrrWlPlbiDDetLpo6jNwGF_tDtAptv9g9-3O-2GtCgOmwD1515u8iLfzsrLQAMNXGZFJsyd5UEEgDGVSimgumuFQy8fTxlMQkssK2u1fAeHRh-xT-au7JDUwYPm5ht3KSEaITtK28CvCq1go9lAaIhSeOB4juFv8Tw3nQGB-4Zv_xacmryoDHuDQyo3CuHXnPso9JRhIwmBxv9WByZl9FPhYNrd9fgOA-_nP89s72nAVsRVTApDWLgM8w6QuilQ_uYuA"
    }
  }

  // useEffect(() => {

  //   const sortedArray = [
  //     {
  //       0: 'hLSL_1',
  //       1: {
  //         betId: "betId_1",
  //         playerId: 1,
  //         points: 1,
  //         sessionId: 'hLSL_1',
  //         username: 'yllipetrovci',
  //         teamId:2
  //       }
  //     },
  //     {
  //       0: 'hLSL_2',
  //       1: {
  //         betId: "betId_2",
  //         playerId: 1,
  //         points: 1,
  //         sessionId: 'hLSL_2',
  //         username: 'yllipetrovcidev',
  //         teamId:2
  //       }
  //     },
  //     {
  //       0: 'hLSL_3',
  //       1: {
  //         betId: "betId_3",
  //         playerId: 1,
  //         points: 1,
  //         sessionId: 'hLSL_3',
  //         username: 'mechanicmayhemm',
  //         teamId:1
  //       }
  //     },
  //     {
  //       0: 'hLSL_3',
  //       1: {
  //         betId: "betId_4",
  //         playerId: 4,
  //         points: 10,
  //         sessionId: 'hLSL_4',
  //         username: 'murlantest',
  //         teamId:1
  //       }
  //     },
  //   ]

  //  const payload = GameRulesService.parseBets2v2("tierId",sortedArray);
  //   console.log(payload);

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
    setPlayers({});
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
      console.log(JSON.stringify(message, null, 2));

    })

    room.onMessage(GAME_ACTIONS.INVALID_ACTION, (message) => {
      alert(message.msg);
    })

    room.onMessage(GAME_ACTIONS.INFO, (message) => {
      alert(message.msg);
      console.log(message.msg);

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
        const roomJoined = await _server.joinRoom(invitedRoomId, { token, teamId, betId, invitedFromId });
        syncRoom(roomJoined);
      } else {
        const roomJoinedOrCreated = await _server.joinOrCreate(gameType, { token, selectedTire, betId, isPrivate });
        syncRoom(roomJoinedOrCreated);
      }

    } catch (e) {
      console.error(e);
    }
  }

  const onClickJoinRoom = async () => {
    const token = username;
    const roomJoined = await _server.joinRoom(privateRoomJoinId, { token, betId, selectedTire, type: gameType });
    syncRoom(roomJoined);
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
    const invitedFromId = queryParams.get('invitedFromId');

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

    if (invitedFromId) {
      setInvitedFromId(invitedFromId);
    }

    setUsername(testTokens[usernameParam].token)
    setBetId(testTokens[usernameParam].betId);
    if (testTokens[usernameParam].isPrivate) {
      setIsPrivate(testTokens[usernameParam].isPrivate);
    }
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

  const handleOnSubmitTeamId = (teamId) => {
    console.log('handleOnSubmitTeamId');
    console.log("TEAM ID:",teamId);
    room.send(GAME_ACTIONS.CHOOSE_TEAM, {
      teamId: parseInt(teamId)
    });
  }


  const queryParams = new URLSearchParams(window.location.search);
  const usernameParam = queryParams.get('username');

  // return (<div/>);
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
          <RoomEnter
            onClickJoinRoom={onClickJoinRoom}
            privateRoomJoinId={privateRoomJoinId}
            setPrivateRoomJoinId={setPrivateRoomJoinId}
            invitedRoomId={invitedRoomId}
            room={room}
            selectedTire={selectedTire}
            handleOnChangeTiers={handleOnChangeTiers}
            handleGameType={handleGameType}
            gameType={gameType}
            onClickTryToReconnectHandler={onClickTryToReconnectHandler}
            onChangeUsernameHandle={onChangeUsernameHandle}
            username={username} onClickJoin={onClickJoin}
          />
        </div>
      }
      {gameSettings.gameStatus === GAME_STATUS.WAITING &&
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <WaitingRoom
            handleOnSubmitTeamId={handleOnSubmitTeamId}
            myPlayer={players[room.sessionId]} waitingRoomPlayers={waitingRoomPlayers} gameType={gameType} room={room} />
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
