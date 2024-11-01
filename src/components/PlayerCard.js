import { PlayerStateEnum } from "../constants/constants";

const PlayerCard = ({ 
    handleOnSubmitTeamId,
    handleOnChangeEmojiSelection, onClickLeave, username,emoji, isReconnecting, itsMe, isYourTurn, sessionId, connectionStatus,matchResult }) => {
    // console.log("PLAYER CARD");
    // console.log(username, isReconnecting, itsMe, isYourTurn, sessionId);

    const emojis = [
        "",
        "emoji1",
        "emoji2",
        "emoji3",
        "emoji4",
        "emoji5",
        "emoji6",
        "emoji7",
        "emoji8",
        "emoji9",
        "emoji10",
        "emoji11",
        "emoji12",
    ]

    
    if (
        matchResult === PlayerStateEnum.LOST ||
        matchResult === PlayerStateEnum.WON) {
            return (
                <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 100, minHeight: 100, margin: 15, padding: 5, position: 'relative' }}>
                <h1>{matchResult}</h1>
                <h2>Connection Status: {connectionStatus}</h2>
            </div>
        )
        
    }
    
    if(connectionStatus === PlayerStateEnum.RECONNECTING || connectionStatus === PlayerStateEnum.DISCONNECTED){
        return (
            <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 100, minHeight: 100, margin: 15, padding: 5, position: 'relative' }}>
                <p>{connectionStatus}</p>
            </div>
        )
    }


    return (
        <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 120, minHeight: 120, margin: 15, padding: 5, position: 'relative' }}>
            {isYourTurn && <div style={{ borderRadius: 50, border: '1px solid green', width: 10, height: 10, backgroundColor: 'green', position: 'absolute' }} />}
            {emoji && emoji.length > 0 && <p>Emoji: {emoji}</p>}
            <p style={{ fontWeight: 'bold' }}>{username}</p>
            <p style={{ margin: 0 }}>sessionId:</p>
            <p style={{ margin: 0 }}>{sessionId}</p>
            {itsMe && <select onChange={handleOnChangeEmojiSelection}>
                {emojis.map((emoji, index) => <option key={index} value={emoji}>{emoji}</option>)}
            </select>}
            {itsMe && <button onClick={onClickLeave}>Leave</button>}
        </div >
    )
}

export default PlayerCard;