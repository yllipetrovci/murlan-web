import { GameRulesService } from '../testGameRulesService';

describe('ADJUST CARD', () => {
    test('playerCards: Ace,Ace,2,3,4,5,6,7,8,9,10,J,Q,K | response:  Ace,2,3,4,5,6,7,8,9,10,J,Q,K,A  ', () => {
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
            { id: 3, name: '4', suit: 'Hearts', value: 2 },
            { id: 4, name: '5', suit: 'Hearts', value: 3 },
            { id: 5, name: '6', suit: 'Hearts', value: 4 },
            { id: 6, name: '7', suit: 'Hearts', value: 5 },
            { id: 7, name: '8', suit: 'Hearts', value: 6 },
            { id: 8, name: '9', suit: 'Hearts', value: 7 },
            { id: 9, name: '10', suit: 'Hearts', value: 8 },
            { id: 10, name: 'Jack', suit: 'Hearts', value: 9 },
            { id: 11, name: 'Queen', suit: 'Hearts', value: 10 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
            { id: 13, name: 'Ace', suit: 'Hearts', value: 12 },
            { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
        ];

        const response = GameRulesService.adjustAceAndTwoValueIfNeeded(playerCards);

        expect(response).toEqual(
            [
                { id: 13, name: 'Ace', suit: 'Hearts', value: -1 },
                { id: 1, name: '2', suit: 'Hearts', value: 0 },
                { id: 2, name: '3', suit: 'Hearts', value: 1 },
                { id: 3, name: '4', suit: 'Hearts', value: 2 },
                { id: 4, name: '5', suit: 'Hearts', value: 3 },
                { id: 5, name: '6', suit: 'Hearts', value: 4 },
                { id: 6, name: '7', suit: 'Hearts', value: 5 },
                { id: 7, name: '8', suit: 'Hearts', value: 6 },
                { id: 8, name: '9', suit: 'Hearts', value: 7 },
                { id: 9, name: '10', suit: 'Hearts', value: 8 },
                { id: 10, name: 'Jack', suit: 'Hearts', value: 9 },
                { id: 11, name: 'Queen', suit: 'Hearts', value: 10 },
                { id: 12, name: 'King', suit: 'Hearts', value: 11 },
                { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
            ]
        );

    })


    test('playerCards: 3,4,5,Ace,2 | response:  Ace,2,3,4,5', () => {
        const playerCards = [
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
            { id: 3, name: '4', suit: 'Hearts', value: 2 },
            { id: 4, name: '5', suit: 'Hearts', value: 3 },
            { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.adjustAceAndTwoValueIfNeeded(playerCards);

        expect(response).toEqual(
            [
                { id: 36, name: 'Ace', suit: 'Hearts', value: -1 },
                { id: 1, name: '2', suit: 'Hearts', value: 0 },
                { id: 2, name: '3', suit: 'Hearts', value: 1 },
                { id: 3, name: '4', suit: 'Hearts', value: 2 },
                { id: 4, name: '5', suit: 'Hearts', value: 3 },
            ]
        );

    })


    test('playerCards: Ace,10,J,Q,K | response:  10,J,Q,K,Ace', () => {
        const playerCards = [
            { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
            { id: 9, name: '10', suit: 'Hearts', value: 8 },
            { id: 10, name: 'Jack', suit: 'Hearts', value: 9 },
            { id: 11, name: 'Queen', suit: 'Hearts', value: 10 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
        ];
        const response = GameRulesService.adjustAceAndTwoValueIfNeeded(playerCards);

        expect(response).toEqual(
            [
                { id: 9, name: '10', suit: 'Hearts', value: 8 },
                { id: 10, name: 'Jack', suit: 'Hearts', value: 9 },
                { id: 11, name: 'Queen', suit: 'Hearts', value: 10 },
                { id: 12, name: 'King', suit: 'Hearts', value: 11 },
                { id: 36, name: 'Ace', suit: 'Hearts', value: 12 },
            ]
        );

    })
});

