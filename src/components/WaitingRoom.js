import { useState } from "react";
import { GAME_TYPES } from "../constants/constants";

const WaitingRoom = ({
    myPlayer,
    waitingRoomPlayers,
    gameType,
    room,
    handleOnSubmitTeamId
}) => {
    console.log("WAITING ROOM");
    console.log(room);
    const [selectedTeamId, setSelectedTeamId] = useState("");

    const inviteFriendURL = `http://localhost:3001/?roomId=${room.roomId}&teamId=${myPlayer.teamId}&invitedFromId=${myPlayer.id}`;

    const onClickCopy = () => {
        navigator.clipboard.writeText(inviteFriendURL).then(function () {
            // Show success message
            console.log("COPIED SUCCESSFULLY")
        }).catch(function (error) {
            console.error("COPY Failed")
        });
    }

    const onClickCopyRoomId = () => {
        navigator.clipboard.writeText(room.roomId).then(function () {
            // Show success message
            console.log("COPIED SUCCESSFULLY")
        }).catch(function (error) {
            console.error("COPY Failed")
        });
    }

    const handleOnChangeTeamId = (event) => {
        setSelectedTeamId(event.target.value);
    }
    console.log("MY PLAYER");
    console.log(myPlayer);
    return (
        <div style={{ flexDirection: 'column' }}>
            {(gameType === GAME_TYPES.GAME_21_2V2 || gameType === GAME_TYPES.SINGLE_GAME_2V2) &&
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    <p style={{ fontSize: 14 }}>{inviteFriendURL}</p>
                    <button onClick={onClickCopy}>copy</button>
                </div>}
            {(gameType === GAME_TYPES.PRIVATE_GAME_2V2 || gameType === GAME_TYPES.PRIVATE_SINGLE_GAME_2V2 ||
                gameType === GAME_TYPES.PRIVATE_GAME_21 || gameType === GAME_TYPES.PRIVATE_SINGLE_GAME
            ) &&
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <p>RoomID: {room.roomId}</p>
                    <button onClick={onClickCopyRoomId}>Copy Room ID</button>
                </div>}
            <div style={{ border: '1px solid black', width: 350, minHight: 400, padding: 20 }}>
                <h3>Waiting Room: {gameType}</h3>

                {!myPlayer.teamId &&
                    <div>
                        <h2>Choose Team</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 20 }}>
                            <label>
                                <input
                                    type="radio"
                                    value={1}
                                    checked={selectedTeamId === '1'}
                                    onChange={handleOnChangeTeamId}
                                />
                                Team 1
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value={2}
                                    checked={selectedTeamId === '2'}
                                    onChange={handleOnChangeTeamId}
                                />
                                Team 2
                            </label>
                        </div>
                        <button onClick={() => { handleOnSubmitTeamId(selectedTeamId) }}>Choose</button>
                    </div>
                }

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