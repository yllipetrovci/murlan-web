import { PlayerStateEnum } from "../constants/playerStatuses";

const PlayerCard = ({ onClickLeave, username, isReconnecting, itsMe, isYourTurn, sessionId, status }) => {

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
        <div style={{ border: itsMe ? '1px solid red' : '1px solid black', width: 100, minHeight: 100, margin: 15, padding: 5, position: 'relative' }}>
            {isYourTurn && <div style={{ borderRadius: 50, border: '1px solid green', width: 10, height: 10, backgroundColor: 'green', position: 'absolute' }} />}
            <p style={{ fontWeight: 'bold' }}>{username}</p>
            <p style={{ margin: 0 }}>sessionId:</p>
            <p style={{ margin: 0 }}>{sessionId}</p>
            {itsMe && <button onClick={onClickLeave}>Leave</button>}
        </div >
    )
}

export default PlayerCard;