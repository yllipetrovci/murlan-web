export const mapPlayers = (players) => {
    let tempPlayers = [];
    let objTempPlayer = {}
    players.forEach((player, key) => {
        const playerObj = {
            id: player.id,
            username: player.username,
            score: player.score,
            connected: player.connected,
            isReconnecting: player.isReconnecting,
            sessionId: key,
            status:player.status,
            hand: mapCards(player.hand)
        }
        tempPlayers.push(playerObj);
        objTempPlayer = { ...objTempPlayer, [key]: playerObj };
    });

    return {players: objTempPlayer, waitingRoomPlayers: tempPlayers};
}


export const mapCards = (cards) => {
    let tempCards = [];

    if(!cards) return [];

    cards.forEach((card, key) => {
        const cardObj = {
            id: card.id,
            name: card.name,
            suit: card.suit,
            value: card.value,

        }
        tempCards.push({ ...cardObj });
    });
    return tempCards;
}


export const mapPlayerPosition = (playerPositions) => {
    let tempPlayerPos = {};

    playerPositions.forEach((playerPos, key) => {
        tempPlayerPos = { ...tempPlayerPos, [key]: playerPos };
    });

    return tempPlayerPos;
}
const mapScores = (scores) => {

    let tempScore = []
    scores.forEach((score) => {
        tempScore.push({
            sessionId: score.sessionId,
            username: score.username,
            points: score.points
        });
    })

    return tempScore;
}


export const mapSessionIdStoreByPosition = (playerPositionIndex) => {
    let tempSessionPositionsIndex = {};
    playerPositionIndex.forEach((playerIndex, key) => {
        tempSessionPositionsIndex = { ...tempSessionPositionsIndex, [key]: playerIndex };
    })
    return tempSessionPositionsIndex;
}

export const mapGameSettings = (gameSettings) => {
    console.log(gameSettings)
    const { gameStatus, playerPositions, scores,turnPosition, sessionIdStoreByPosition,round } = gameSettings;
    const mappedPlayerPosition = mapPlayerPosition(playerPositions);
    const mappedSessionIdStoreByPosition = mapSessionIdStoreByPosition(sessionIdStoreByPosition);
    const mappedScores = mapScores(scores);
    


    return {
        round,
        gameStatus: gameStatus,
        playerPositions: mappedPlayerPosition,
        sessionPositionsIndex: mappedSessionIdStoreByPosition,
        scores: mappedScores,
        turnPosition
    }
}
