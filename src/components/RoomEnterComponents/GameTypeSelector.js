import { GAME_TYPES } from "../../constants/constants";

const GameTypeSelector = ({ gameType, handleGameType }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 20 }}>
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.GAME_21}
                    checked={gameType === GAME_TYPES.GAME_21}
                    onChange={handleGameType}
                />
                21 Game
            </label>
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.SINGLE_GAME}
                    checked={gameType === GAME_TYPES.SINGLE_GAME}
                    onChange={handleGameType}
                />
                Single Game
            </label>
            <hr style={{ border: '1px solid black', width: 150 }} />
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.PRIVATE_GAME_21}
                    checked={gameType === GAME_TYPES.PRIVATE_GAME_21}
                    onChange={handleGameType}
                />
               Private 21 Game
            </label>
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.PRIVATE_SINGLE_GAME}
                    checked={gameType === GAME_TYPES.PRIVATE_SINGLE_GAME}
                    onChange={handleGameType}
                />
                Private Single Game
            </label>
            <hr style={{ border: '1px solid black', width: 150 }} />
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.GAME_21_2V2}
                    checked={gameType === GAME_TYPES.GAME_21_2V2}
                    onChange={handleGameType}
                />
                2v2 - 21 Game
            </label>
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.SINGLE_GAME_2V2}
                    checked={gameType === GAME_TYPES.SINGLE_GAME_2V2}
                    onChange={handleGameType}
                />
                2v2 - Single Game
            </label>
            <hr style={{ border: '1px solid black', width: 150 }} />
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.PRIVATE_SINGLE_GAME_2V2}
                    checked={gameType === GAME_TYPES.PRIVATE_SINGLE_GAME_2V2}
                    onChange={handleGameType}
                />
                Private 2v2 - Single Game
            </label>
            <label>
                <input
                    type="radio"
                    value={GAME_TYPES.PRIVATE_GAME_2V2}
                    checked={gameType === GAME_TYPES.PRIVATE_GAME_2V2}
                    onChange={handleGameType}
                />
                Private 2v2 - 21 Game
            </label>
        </div>
    );
};

export default GameTypeSelector;
