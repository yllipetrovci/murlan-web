import { GameRulesService } from '../testGameRulesService';

describe('(NOT VALID MOVE) Free Hand', () => {
    test('playerCards: 2,King (Dobule)', () => {
        const playerCards = [
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: 'King', suit: 'Hearts', value: 11 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeFalsy();
    })

    test('playerCards: 2 but with value 20(Single)', () => {
        const playerCards = [
            { id: 12, name: '2', suit: 'Hearts', value: 20 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeFalsy();
    })

    test('playerCards: 2,2,2,2,2,2,2', () => {
        const playerCards = [
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
            { id: 12, name: '2', suit: 'Hearts', value: 13 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeFalsy();
    })

    test('playerCards: 3,4,7,8,9', () => {
        const playerCards = [
            { id: 12, name: '3', suit: 'Hearts', value: 1 },
            { id: 12, name: '4', suit: 'Hearts', value: 2 },
            { id: 12, name: '7', suit: 'Hearts', value: 5 },
            { id: 12, name: '8', suit: 'Hearts', value: 6 },
            { id: 12, name: '9', suit: 'Hearts', value: 9 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeFalsy();
    })
});


describe('(VALID MOVE) Free Hand', () => {
    test('playerCards: 1 (Signle)', () => {   
        const playerCards = [
            { id: 53, name: '1', suit: 'Black', value: 12 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeTruthy();
    })

    test('playerCards: 1,1 (Double)', () => {   
        const playerCards = [
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeTruthy();
    })

    test('playerCards: 1,1,1 (Triple)', () => {   
        const playerCards = [
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeTruthy();
    })

    test('playerCards: 1,1,1,1 (Bomb)', () => {   
        const playerCards = [
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
            { id: 53, name: '1', suit: 'Black', value: 12 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeTruthy();
    })

    test('playerCards: 1,2,3,4,5 (Kolor)', () => {   
        const playerCards = [
            { id: 53, name: '1', suit: 'Black', value: -1 },
            { id: 53, name: '2', suit: 'Black', value: 0 },
            { id: 53, name: '3', suit: 'Black', value: 1 },
            { id: 53, name: '4', suit: 'Black', value: 2 },
            { id: 53, name: '5', suit: 'Black', value: 3 },
        ];

        const response = GameRulesService.isValidFreeHand(playerCards);
        expect(response).toBeTruthy();
    })
})

