import { GameRulesService } from '../testGameRulesService';

describe('(NOT VALID MOVE) SINGLE', () => {
    test('deckCards: 2(Single) | playerCards: 2,2 (Double)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },

        ];
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },

        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2(Single) | playerCards: 2,2,2 (Tripple)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },

        ];
        const playerCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
            { id: 2, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2(Single) | playerCards: 3 (Single)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },

        ];
        const playerCards = [
            { id: 2, name: '3', suit: 'Hearts', value: 1 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })

    test('deckCards: 2(Single) | playerCards: King (Single)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },

        ];
        const playerCards = [
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeFalsy();
    })
});



describe('(VALID MOVE) SINGLE', () => {
    test('deckCards: 2(Single) | playerCards: Black Joker (Single)', () => {
        const deckCards = [
            { id: 1, name: '2', suit: 'Hearts', value: 13 },

        ];

        const playerCards = [
            { id: 53, name: 'Joker', suit: 'Black', value: 14 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards: 3(Single) | playerCards: 4 (Single)', () => {
        const deckCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },

        ];
        
        const playerCards = [
            { id: 53, name: '4', suit: 'Black', value: 2 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Jack (Single) | playerCards: King (Single)', () => {
        const deckCards = [
            { id: 49, name: 'Jack', suit: 'Spades', value: 9 },

        ];
        
        const playerCards = [
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Queen (Single) | playerCards: King (Single)', () => {
        const deckCards = [
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },

        ];
        
        const playerCards = [
            { id: 51, name: 'King', suit: 'Spades', value: 11 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })

    test('deckCards:  Queen (Single) | playerCards: 3,3,3,3 (Bomb)', () => {
        const deckCards = [
            { id: 49, name: 'Queen', suit: 'Spades', value: 10 },

        ];
        
        const playerCards = [
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
            { id: 1, name: '3', suit: 'Hearts', value: 1 },
        ];

        const response = GameRulesService.isValidMove(deckCards, playerCards);
        expect(response).toBeTruthy();
    })
})

