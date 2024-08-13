const WaitingRoom = ({ waitingRoomPlayers }) => {
    return (
        <div style={{ border: '1px solid black', width: 350, height: 400, padding: 20 }}>
            <h1>Waiting Room</h1>

            {waitingRoomPlayers &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 40,
                    flexWrap: 'wrap'
                }}>
                    {waitingRoomPlayers.map((player) => {
                        return (
                            <div key={player.id} style={{
                                border: '1px solid black',
                                width: 100,
                                height: 100,
                                justifyContent: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <p>{player.username}</p>
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
};

export default WaitingRoom;