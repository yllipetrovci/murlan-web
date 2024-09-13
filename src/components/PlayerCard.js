import { PlayerStateEnum } from "../constants/constants";

const PlayerCard = ({ handleOnChangeEmojiSelection, onClickLeave, username,emoji, isReconnecting, itsMe, isYourTurn, sessionId, status }) => {
    console.log(username, isReconnecting, itsMe, isYourTurn, sessionId, status);

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
        status === PlayerStateEnum.DISCONNECTED ||
        status === PlayerStateEnum.LOST ||
        status === PlayerStateEnum.WON) {
        return (
            <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 100, minHeight: 100, margin: 15, padding: 5, position: 'relative' }}>
                <h1>{status}</h1>
            </div>
        )

    }

    if (isReconnecting) {
        return (
            <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 100, minHeight: 100, margin: 15, padding: 5, position: 'relative' }}>
                <p>isReconnecting...</p>
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