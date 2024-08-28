import { useEffect, useState, useMemo } from 'react';
import Table from "./Table";
import PlayerCard from "./PlayerCard";
import HandCards from './HandCards';
import { GAME_STATUS } from '../constants/constants';

const Row = ({ children, customStyle }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', ...customStyle }}>
            {children}
        </div>
    )
}

const Position = ({ pos, children }) => {
    return (
        <div style={{ border: '1px solid black', minWidth: 100, minHeight: 100 }}>
            {/* Position: {pos} */}
            {children}
        </div>
    )
}

const GamePlay = ({
    selectedCards,
    sessionPositionsIndex,
    playerPositions,
    players,
    turnPosition,
    room,
    handleOnClickPass,
    handleOnPlayCard,
    onClickLeave,
    onClickCard,
    tableCards,
    setSelectedCards,
    gameStatus
}) => {
    const [playersState, setPlayersState] = useState({
        myPlayer: null,
        secondPlayer: null,
        thirdPlayer: null,
        fourthPlayer: null,
    });

    function getNextPositionIndex(currentIndex, totalPositions) {
        return (currentIndex % totalPositions) + 1;
    }

    useEffect(() => {
        // debugger;
        if (turnPosition === undefined || players === undefined || playerPositions === undefined) return;
        const currentPositionIndex = sessionPositionsIndex[room.sessionId];
        const totalPositions = 4;
        const position2ActualIndex = getNextPositionIndex(currentPositionIndex, totalPositions);
        const position3ActualIndex = getNextPositionIndex(position2ActualIndex, totalPositions);
        const position4ActualIndex = getNextPositionIndex(position3ActualIndex, totalPositions);

        const secondPlayerSessionId = playerPositions[position2ActualIndex];
        const thirdPlayerSessionId = playerPositions[position3ActualIndex];
        const fourthPlayerSessionId = playerPositions[position4ActualIndex];

        setPlayersState({
            myPlayer: players[room.sessionId],
            secondPlayer: players[secondPlayerSessionId],
            thirdPlayer: players[thirdPlayerSessionId],
            fourthPlayer: players[fourthPlayerSessionId],
        });
    }, [turnPosition, players, playerPositions, sessionPositionsIndex, room?.sessionId]);

    useEffect(() => {
        console.log(playersState.myPlayer)
        if (playersState.myPlayer === null) return;

        if(gameStatus === GAME_STATUS.SWAPPING){
            setSelectedCards([]);
        }else{
            setSelectedCards(playersState.myPlayer?.hand);
        }

    }, [playersState.myPlayer])

    const buttonDefaultStyle = {
        width: 120,
        height: 40,
        fontSize: 20,
        fontWeight: 'bold'
    }

    const isYourTurn = room?.sessionId === turnPosition;
    const { myPlayer, secondPlayer, thirdPlayer, fourthPlayer } = playersState;


    return (
        <div>
            <h1>GAME STATUS: {gameStatus}</h1>
            <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'

            }}>
                <Row customStyle={{ justifyContent: 'center' }}>
                    <Position pos={3}>
                        <PlayerCard
                            isYourTurn={thirdPlayer?.sessionId === turnPosition}
                            onClickLeave={onClickLeave}
                            itsMe={thirdPlayer?.sessionId === room.sessionId}
                            key={thirdPlayer?.id}
                            {...thirdPlayer}
                        />
                    </Position>
                </Row>
                <Row customStyle={{
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <Position pos={2}>
                        <PlayerCard
                            isYourTurn={secondPlayer?.sessionId === turnPosition}
                            onClickLeave={onClickLeave}
                            itsMe={secondPlayer?.sessionId === room.sessionId}
                            key={secondPlayer?.id}
                            {...secondPlayer}
                        />
                    </Position>
                    <Table cards={tableCards} />
                    <Position pos={4}>
                        <PlayerCard
                            isYourTurn={fourthPlayer?.sessionId === turnPosition}
                            onClickLeave={onClickLeave}
                            itsMe={fourthPlayer?.sessionId === room.sessionId}
                            key={fourthPlayer?.id}
                            {...fourthPlayer}
                        />
                    </Position>
                </Row>
                <Row customStyle={{ justifyContent: 'center' }}>
                    <Position pos={1}>
                        <PlayerCard
                            isYourTurn={myPlayer?.sessionId === turnPosition}
                            onClickLeave={onClickLeave}
                            itsMe={myPlayer?.sessionId === room.sessionId}
                            key={myPlayer?.id}
                            {...myPlayer}
                        />
                    </Position>
                </Row>
            </div>
            <div>
                {myPlayer && <HandCards player={{ ...myPlayer }} isYourTurn={isYourTurn} selectedCards={selectedCards} onClickCard={onClickCard} />}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 200px',
                    marginTop: 20,
                    border: '1px solid black'
                }}
            >
                <button disabled={!isYourTurn} style={buttonDefaultStyle} onClick={handleOnClickPass}>Pass</button>
                <button disabled={!isYourTurn} style={{ ...buttonDefaultStyle, background: 'green', color: '#fff' }} onClick={handleOnPlayCard}>Play</button>

            </div>
        </div>
    )
};

export default GamePlay;