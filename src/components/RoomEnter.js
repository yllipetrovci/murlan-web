import { GAME_TYPES, TIERS } from "../constants/constants";
import UsernameInput from './RoomEnterComponents/UsernameInput';
import GameTypeSelector from './RoomEnterComponents/GameTypeSelector';
import TierSelector from './RoomEnterComponents/TierSelector';
import JoinButton from './RoomEnterComponents/JoinButton';
import ReconnectButton from './RoomEnterComponents/ReconnectButton';

const RoomEnter = ({
    room,
    selectedTire,
    handleOnChangeTiers,
    onClickTryToReconnectHandler,
    onChangeUsernameHandle,
    username,
    onClickJoin,
    gameType,
    handleGameType,
    invitedRoomId,
    privateRoomJoinId,
    setPrivateRoomJoinId,
    onClickJoinRoom
}) => {

    const hasReconnection = sessionStorage.getItem('cachedReconnectionToken');

    return (
        <div style={{ border: '1px solid black', width: 800, padding: 30 }}>
            <h2>Game {room?.hasJoined ? "Joined" : "Join"}</h2>
            {room && <p>Room ID: {room.roomId}</p>}
            <div>
                <input placeholder="JOIN PRIVATE ROOM" value={privateRoomJoinId} onChange={(e) => { setPrivateRoomJoinId(e.target.value) }} />
                <button onClick={onClickJoinRoom}>Join private room</button>
            </div>
            <hr />

            {!room && <UsernameInput username={username} onChangeUsernameHandle={onChangeUsernameHandle} />}
            {!invitedRoomId && <>
                <GameTypeSelector gameType={gameType} handleGameType={handleGameType} />

                <TierSelector TIERS={TIERS} selectedTire={selectedTire} handleOnChangeTiers={handleOnChangeTiers} />
            </>}
            {!room && <JoinButton onClickJoin={onClickJoin} />}
            {hasReconnection && <ReconnectButton onClickTryToReconnectHandler={onClickTryToReconnectHandler} />}
        </div>
    );
};

export default RoomEnter;
