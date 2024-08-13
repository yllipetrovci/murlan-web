const RoomEnter = ({ room,onClickTryToReconnectHandler, onChangeUsernameHandle, username, onClickJoin }) => {
    
    const hasReconnection = sessionStorage.getItem('cachedReconnectionToken');
    console.log("HAS hasReconnection: ",hasReconnection);
    return (
        <div style={{border:'1px solid black', width:300,height:300}}>
            <h2>Game {room?.hasJoined ? "Joined" : "Join"}</h2>
            {room && <p>Room ID: {room.roomId}</p>}
            {/* {room && <p>Session ID: {room.sessionId}</p>} */}
            {/* {room && <p>ReconnectionToken ID: {room.reconnectionToken}</p>} */}

            {!room && <input onChange={onChangeUsernameHandle} type="text" value={username} placeholder='username' />}
            {!room && <button onClick={onClickJoin}>Join</button>}
            {hasReconnection && <button onClick={onClickTryToReconnectHandler}>Reconnect</button>}
        </div>
    )
};

export default RoomEnter;