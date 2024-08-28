import { GameRulesService } from '../testGameRulesService';

describe('(NOT VALID MOVE) Triple', () => {
    test('deckCards: 2,2(Double) | playerCards: 3,3,3 (Triple)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
        ];
        const playerCards = [
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2,2,2 (Triple) | playerCards: King,King,King (Triple)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
        ];
        
        const playerCards = [
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2,2,2(Triple) | playerCards: 2,King (Dobule)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
        ];
        const playerCards = [
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })
});



describe('(VALID MOVE) Triple', () => {
    test('deckCards: 3,3,3 (Triple) | playerCards: 4,4,4 (Triple)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
        ];
        
        const playerCards = [
            { id: 53, name: '4', suit: 'Black', value: 2 },
            { id: 53, name: '4', suit: 'Black', value: 2 },
            { id: 53, name: '4', suit: 'Black', value: 2 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Jack, Jack,Jack (Triple) | playerCards: King, King,King (Triple)', () => {
        const deckCards = [
            { id: 49, name: 'Jack', suit: 'Spades', value: 9 },
            { id: 49, name: 'Jack', suit: 'Spades', value: 9 },
            { id: 49, name: 'Jack', suit: 'Spades', value: 9 },
        ];
        
        const playerCards = [
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Queen, Queen,Quen (Triple) | playerCards: King,King,King (Triple)', () => {
        const deckCards = [
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
        ];
        
        const playerCards = [
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 49, name: 'King', suit: 'Spades', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Queen, Queen,Quen (Triple) | playerCards: King,King,King, King (Bomb)', () => {
        const deckCards = [
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },
        ];
        
        const playerCards = [
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
            { id: 49, name: 'King', suit: 'Spades', value: 11 },
            { id: 49, name: 'King', suit: 'Spades', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })
})

