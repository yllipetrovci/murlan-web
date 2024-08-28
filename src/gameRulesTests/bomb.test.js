import { GameRulesService } from '../testGameRulesService';

describe('(NOT VALID MOVE) BOMB', () => {
    test('deckCards: 3,3,3,3 (Bomb) | playerCards: 2 (Single)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },

        ];
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 3,3,3,3 (Bomb) | playerCards: 2,2 (Double)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },
        ];
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 3,3,3,3 (Bomb) | playerCards: 2,2,2 (triple)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },

        ];
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards:  2,2,2,2 (Bomb) | playerCards: 3,3,3,3 (Bomb)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
        ];
        const playerCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })
});



describe('(VALID MOVE) BOMB', () => {
    test('deckCards: 3,3,3,3 (Bomb) | playerCards: 4,4,4,4(Bomb)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },
        ];

        const playerCards = [
            { id: 1, name: '4', suit: 'Hearts', value: 2 },
            { id: 2, name: '4', suit: 'Diamonds', value: 2 },
            { id: 3, name: '4', suit: 'Clubs', value: 2 },
            { id: 4, name: '4', suit: 'Spades', value: 2 },


        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: 4,4,4,4 (Bomb) | playerCards: 5,5,5,5(Bomb)', () => {
        const deckCards = [
            { id: 1, name: '4', suit: 'Hearts', value: 2 },
            { id: 2, name: '4', suit: 'Diamonds', value: 2 },
            { id: 3, name: '4', suit: 'Clubs', value: 2 },
            { id: 4, name: '4', suit: 'Spades', value: 2 },
        ];

        const playerCards = [
            { id: 1, name: '5', suit: 'Hearts', value: 3 },
            { id: 2, name: '5', suit: 'Diamonds', value: 3 },
            { id: 3, name: '5', suit: 'Clubs', value: 3 },
            { id: 4, name: '5', suit: 'Spades', value: 3 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: 4(Single) | playerCards: 5,5,5,5(Bomb)', () => {
        const deckCards = [
            { id: 4, name: '4', suit: 'Spades', value: 2 },
        ];

        const playerCards = [
            { id: 1, name: '5', suit: 'Hearts', value: 3 },
            { id: 2, name: '5', suit: 'Diamonds', value: 3 },
            { id: 3, name: '5', suit: 'Clubs', value: 3 },
            { id: 4, name: '5', suit: 'Spades', value: 3 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: 2(Single) | playerCards: 3,3,3,3(Bomb)', () => {
        const deckCards = [
            { id: 4, name: '2', suit: 'Spades', value: 13 },
        ];

        const playerCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Diamonds', value: 1 },
            { id: 3, name: '3', suit: 'Clubs', value: 1 },
            { id: 4, name: '3', suit: 'Spades', value: 1 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })
})

