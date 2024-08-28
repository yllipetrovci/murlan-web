import { GameRulesService } from '../testGameRulesService';

describe('(NOT VALID MOVE) KOLOR', () => {
    test('deckCards: Ace,2,3,4,5 (Kolor) | playerCards: 10,J,Q,K,Ace (Kolor)', () => {
        const deckCards = [
            { id: 13, name: 'Ace', suit: 'Hearts', value: -1 },
            { id: 1, name: '2', suit: 'Hearts', value: 0 },
            { id: 15, name: '3', suit: 'Diamonds', value: 1 },
            { id: 16, name: '4', suit: 'Diamonds', value: 2 },
            { id: 17, name: '5', suit: 'Diamonds', value: 3 },
        ];

        const playerCards = [
            { id: 22, name: '10', suit: 'Diamonds', value: 8 },
            { id: 23, name: 'Jack', suit: 'Diamonds', value: 9 },
            { id: 24, name: 'Queen', suit: 'Diamonds', value: 10 },
            { id: 25, name: 'King', suit: 'Diamonds', value: 11 },
            { id: 26, name: 'Ace', suit: 'Diamonds', value: 12 },

        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2,2,2,2 (Bomb) | playerCards: 10,J,Q,K,Ace (Kolor)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 14, name: '2', suit: 'Diamonds', value: 13 },
            { id: 27, name: '2', suit: 'Clubs', value: 13 },
            { id: 40, name: '2', suit: 'Spades', value: 13 },
        ];

        const playerCards = [
            { id: 22, name: '10', suit: 'Diamonds', value: 8 },
            { id: 23, name: 'Jack', suit: 'Diamonds', value: 9 },
            { id: 24, name: 'Queen', suit: 'Diamonds', value: 10 },
            { id: 25, name: 'King', suit: 'Diamonds', value: 11 },
            { id: 26, name: 'Ace', suit: 'Diamonds', value: 12 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 3,3,3,3 (Bomb) | playerCards: 10,J,Q,K,Ace (Kolor)', () => {
        const deckCards = [
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
            { id: 16, name: '3', suit: 'Diamonds', value: 1 },
            { id: 28, name: '3', suit: 'Clubs', value: 1 },
            { id: 41, name: '3', suit: 'Spades', value: 1 },
        ];

        const playerCards = [
            { id: 22, name: '10', suit: 'Diamonds', value: 8 },
            { id: 23, name: 'Jack', suit: 'Diamonds', value: 9 },
            { id: 24, name: 'Queen', suit: 'Diamonds', value: 10 },
            { id: 25, name: 'King', suit: 'Diamonds', value: 11 },
            { id: 26, name: 'Ace', suit: 'Diamonds', value: 12 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })
});

describe('(VALID MOVE) KOLOR', () => {
    test('deckCards: 2,3,4,5,6 (Kolor | playerCards: 3,4,5,6,7(Kolor)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 0 },
            { id: 15, name: '3', suit: 'Hearts', value: 1 },
            { id: 16, name: '4', suit: 'Clubs', value: 2 },
            { id: 17, name: '5', suit: 'Diamonds', value: 3 },
            { id: 18, name: '6', suit: 'Diamonds', value: 4 },
        ];

        const playerCards = [
            { id: 15, name: '3', suit: 'Hearts', value: 1 },
            { id: 16, name: '4', suit: 'Clubs', value: 2 },
            { id: 17, name: '5', suit: 'Diamonds', value: 3 },
            { id: 18, name: '6', suit: 'Diamonds', value: 4 },
            { id: 19, name: '7', suit: 'Diamonds', value: 5 },


        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: Ace,2,3,4,5 (Kolor | playerCards: 2,3,4,5,6 (Kolor)', () => {
        const deckCards = [
            { id: 13, name: 'Ace', suit: 'Hearts', value: -1 },
            { id: 1, name: '2', suit: 'Hearts', value: 0 },
            { id: 15, name: '3', suit: 'Diamonds', value: 1 },
            { id: 16, name: '4', suit: 'Clubs', value: 2 },
            { id: 17, name: '5', suit: 'Diamonds', value: 3 },
        ];

        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 0 },
            { id: 15, name: '3', suit: 'Diamonds', value: 1 },
            { id: 16, name: '4', suit: 'Diamonds', value: 2 },
            { id: 17, name: '5', suit: 'Clubs', value: 3 },
            { id: 18, name: '6', suit: 'Diamonds', value: 4 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    });


    test('deckCards: Ace,2,3,4,5,6 (Kolor) | playerCards: 2,3,4,5,6,7 (Kolor)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 0 },
            { id: 15, name: '3', suit: 'Diamonds', value: 1 },
            { id: 16, name: '4', suit: 'Diamonds', value: 2 },
            { id: 17, name: '5', suit: 'Clubs', value: 3 },
            { id: 18, name: '6', suit: 'Spades', value: 4 },
        ];

        const playerCards = [
            { id: 15, name: '3', suit: 'Hearts', value: 1 },
            { id: 16, name: '4', suit: 'Diamonds', value: 2 },
            { id: 17, name: '5', suit: 'Clubs', value: 3 },
            { id: 18, name: '6', suit: 'Spades', value: 4 },
            { id: 18, name: '7', suit: 'Diamonds', value: 5 },

        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: 5,6,7,8,9 (Kolor) | playerCards: 6,7,8,9,10 (Kolor)', () => {
        const deckCards = [
            { id: 17, name: '5', suit: 'Hearts', value: 3 },
            { id: 18, name: '6', suit: 'Diamonds', value: 4 },
            { id: 17, name: '7', suit: 'Clubs', value: 5 },
            { id: 18, name: '8', suit: 'Spades', value: 6 },
            { id: 19, name: '9', suit: 'Diamonds', value: 7 },
        ];

        const playerCards = [
            { id: 18, name: '6', suit: 'Hearts', value: 4 },
            { id: 17, name: '7', suit: 'Diamonds', value: 5 },
            { id: 18, name: '8', suit: 'Clubs', value: 6 },
            { id: 19, name: '9', suit: 'Diamonds', value: 7 },
            { id: 20, name: '10', suit: 'Spades', value: 8 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })
})