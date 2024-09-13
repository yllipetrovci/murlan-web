const GameOver = ({ gameEndType,scores }) => {
    return (
        <div style={{ border: '1px solid black', width: 300, height: 300 }}>
            <div>
                <h1>{gameEndType.replaceAll("_"," ")}</h1>
                {scores.map((score) => (
                    <p key={score.sessionId}>{score.username}:{score.points}</p>
                ))}
            </div>
        </div>
    )
};

export default GameOver;