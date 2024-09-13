import { GAME_TYPES } from "../constants/constants";

const WaitingRoom = ({ myPlayer, waitingRoomPlayers, gameType, room }) => {
    console.log("WAITING ROOM");
    console.log(room);

    const inviteFriendURL = `http://localhost:3001/?roomId=${room.roomId}&teamId=${myPlayer.teamId}`;

    const onClickCopy = () =>{
        navigator.clipboard.writeText(inviteFriendURL).then(function() {
            // Show success message
            console.log("COPIED SUCCESSFULLY")
        }).catch(function(error) {
            console.error("COPY Failed")
        });
    }
    return (
        <div style={{ flexDirection: 'column' }}>
            {(gameType === GAME_TYPES.GAME_21_2V2 || gameType === GAME_TYPES.SINGLE_GAME_2V2) && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                <p style={{ fontSize: 14 }}>{inviteFriendURL}</p>
                <button onClick={onClickCopy}>copy</button>
            </div>}
            <div style={{ border: '1px solid black', width: 350, height: 400, padding: 20 }}>
                <h3>Waiting Room: {gameType}</h3>

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
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <p>{player.username}</p>
                                    {player.teamId && <p>Team: {player.teamId}</p>}
                                </div>
                            )
                        })}
                    </div>}
            </div>
        </div>
    )
};

export default WaitingRoom;