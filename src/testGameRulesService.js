import { config } from "./config";

export class GameRulesService {

    static isBomb(cards) {
        return cards.length === 4 && cards.every(card => card.rank === cards[0].rank && card.value <= config.MAX_CARD_VALUE);
    }

    static isKolor(cards) {
        if (cards.length < 5) return false; // Kolor must have 5 or more cards
        // const decision = cards.every(card => card.suit === cards[0].suit);

        const decision = cards.every((card, index) => {
            if (index === 0) return true; // Skip the first card
            return ((card.value === cards[index - 1].value + 1) && card.value <= config.MAX_CARD_VALUE);
        });

        return decision;
    }

    static adjustAceAndTwoValueIfNeeded(cards) {
        let adjustCards = cards;
        const ADJUST_POWER_VALUE = { ACE: -1, "2": 0 };

        const hasKing = cards.some(card => card.name === "King");
        const aceIndex = cards.findIndex(card => card.name === "Ace");
        const aceCards = cards.filter(card => card.name === "Ace");

        const twoIndex = cards.findIndex(card => card.name === "2");

        debugger
        if (!hasKing) {
            if (twoIndex !== -1) {
                adjustCards[twoIndex].value = ADJUST_POWER_VALUE[2];
            }
            if (aceIndex !== -1) {
                // Adjust Ace to be lowest if no King is present
                adjustCards[aceIndex].value = ADJUST_POWER_VALUE.ACE;
            }
        } else {
            if (aceCards.length >= 1) {
                if (aceIndex !== -1 && twoIndex !== -1) {
                    adjustCards[aceIndex].value = -1; // Keep one Ace high
                }

            }
            if (twoIndex !== -1 && aceCards.length >= 1) {
                // With King present, '2' retains its high value
                adjustCards[twoIndex].value = ADJUST_POWER_VALUE[2]; // Keep one Ace high
            }
        }

        cards = adjustCards.sort((a, b) => a.value - b.value);

        return cards;
    }
    
    static isValidMove3Match(cards) {
        // Check if any card has the ID of 41
        const is3Match = cards.some(card => card.id === 41);

        if (!is3Match) {
            return false; // If no card with ID 41, move is invalid
        }

        if (cards.length === 0) {
            return false; // No cards is not a valid hand
        }

        if (cards.length === 1 && cards[0].value <= config.MAX_CARD_VALUE) {
            return true; // Rule 1: A single card is valid
        }

        // Sort the cards by value to easily check sequences and duplicates
        cards.sort((a, b) => a.value - b.value);

        // Check if all cards have the same value
        const allSameValue = cards.every(card => (card.value === cards[0].value) && card.value <= config.MAX_CARD_VALUE);

        if (cards.length === 2) {
            return allSameValue; // Rule 2: Two cards with the same value are valid
        }

        if (cards.length === 3) {
            return allSameValue; // Rule 3: Three cards with the same value are valid
        }

        if (cards.length === 4) {
            return allSameValue; // Rule 5: Four cards with the same value are a valid bomb
        }

        if (cards.length >= 5) {
            return this.isKolor(cards); // Rule 6: Kolor check for 5 or more cards
        }

        // If none of the conditions are met, it's not a valid hand
        return false;
    }


    static isValidFreeHand(cards) {
        if (cards.length === 0) {
            return false; // No cards are not a valid hand.
        }

        if (cards.length === 1 && cards[0].value <= config.MAX_CARD_VALUE) {
            return true; // Rule 1: A single card is valid.
        }

        // Sort the cards by value to easily check sequences and duplicates
        cards.sort((a, b) => a.value - b.value);

        // Check if all cards have the same value
        const allSameValue = cards.every(card => (card.value === cards[0].value) && card.value <= config.MAX_CARD_VALUE);

        if (cards.length === 2) {
            return allSameValue; // Rule 2: Two cards with the same value is valid.
        }

        if (cards.length === 3) {
            return allSameValue; // Rule 3: Three cards with the same value is valid.
        }

        if (cards.length === 4) {
            return allSameValue; // Rule 5: Four cards with the same value is a valid bomb.
        }

        if (cards.length >= 5) {
            return this.isKolor(cards);
        }

        // If none of the conditions are met, it's not a valid hand
        return false;
    }

    static isValidFreeHand(cards) {
        if (cards.length === 0) {
            return false; // No cards are not a valid hand.
        }

        if (cards.length === 1 && cards[0].value <= config.MAX_CARD_VALUE) {
            return true; // Rule 1: A single card is valid.
        }

        // Sort the cards by value to easily check sequences and duplicates
        cards.sort((a, b) => a.value - b.value);

        // Check if all cards have the same value
        const allSameValue = cards.every(card => (card.value === cards[0].value) && card.value <= config.MAX_CARD_VALUE);

        if (cards.length === 2) {
            return allSameValue; // Rule 2: Two cards with the same value is valid.
        }

        if (cards.length === 3) {
            return allSameValue; // Rule 3: Three cards with the same value is valid.
        }

        if (cards.length === 4) {
            return allSameValue; // Rule 5: Four cards with the same value is a valid bomb.
        }

        if (cards.length >= 5) {
            return this.isKolor(cards);
        }

        // If none of the conditions are met, it's not a valid hand
        return false;
    }

    static isValidMove(deckCards, playerCards) {
        // First move, any move is valid.
        if (playerCards.length === 0) return false;

        // Sort the cards only if there are multiple cards and if necessary for comparison
        if (deckCards.length > 1) {
            deckCards = deckCards.sort((a, b) => a.value - b.value);
        }

        if (playerCards.length > 1) {
            playerCards = playerCards.sort((a, b) => a.value - b.value);
        }

        // Check if either set is a bomb
        const isdeckCardsBomb = this.isBomb(deckCards);
        const playerCardsIsBomb = this.isBomb(playerCards);

        // If the incoming cards are a bomb and either the table cards are not a bomb or incoming bomb is higher
        if (playerCardsIsBomb) {
            return !isdeckCardsBomb || playerCards[0].value > deckCards[0].value;
        }

        // If the table has a bomb and incoming cards are not a bomb, the move is invalid
        if (isdeckCardsBomb) {
            return false;
        }

        // Check if either set is a kolor
        const deckCardsIsKolor = this.isKolor(deckCards);
        const playerCardsIsKolor = this.isKolor(playerCards);

        if (playerCardsIsKolor) {
            playerCards = this.adjustAceAndTwoValueIfNeeded(playerCards);
        }

        // Kolor rules
        if (deckCardsIsKolor) {
            if (playerCardsIsKolor) {
                if (deckCards.length < 4) {
                    return true; // Kolor can beat all non-kolor combinations
                }

                const firstTableCardValue = deckCards[0].value;
                const firstIncomingCardValue = playerCards[0].value;

                const isSequential = playerCards.every((card, index) => index === 0 || card.value === playerCards[index - 1].value + 1);

                return isSequential && firstIncomingCardValue === firstTableCardValue + 1 && playerCards[playerCards.length - 1].value > deckCards[deckCards.length - 1].value;
            }

            return false; // Kolor on the table can only be beaten by a higher kolor or bomb
        }

        // If no special rules apply, compare the sets directly
        if (deckCards.length === playerCards.length) {
            const allCardsSameValue = playerCards.length === 1 || playerCards.every(card => card.value === playerCards[0].value);
            return allCardsSameValue && deckCards[0].value < playerCards[0].value;
        }

        // Otherwise, the move is invalid
        return false;
    }



    static _hasFinalWinner(scores) {
        
        let highestScore = 0;
        let highestScorerCount = 0;
        let playersWithFinalThreshold = 0;

        for (const score of scores) {
            if (score.points >= 21) {
                playersWithFinalThreshold++;
                if (score.points > highestScore) {
                    highestScore = score.points;
                    highestScorerCount = 1;
                } else if (score.points === highestScore) {
                    highestScorerCount++;
                }
            }
        }

        if (playersWithFinalThreshold === 1 && highestScorerCount === 1) {
            return true;
        }

        if (highestScorerCount > 1) {
            return false;
        }

        if (playersWithFinalThreshold > 1 && highestScorerCount === 1) {
            return true;
        }

        return false;
    }

    static winnerBet(score, position, tier){
        const MULTIPLIERS = { 1: 2.4, 2: 1.2, 3: 0.2, 4: 0.5 };
        const multiplier= MULTIPLIERS[position];
        const payoutCalculated = (tier.stake * multiplier);
    
       /*  logger.info(`[winnerBet] Calculating winner bet`, {
            playerId: score.playerId,
            betId: score.betId,
            position,
            multiplier,
            stake: tier.stake,
            payout: payoutCalculated
        }); */
    
        return {
            action: 'win',
            data: {
                betId: score.betId,
                userId: score.playerId,
                payout: payoutCalculated,
                multiplier: multiplier
            }
        };
    }
    
    static lostBet(score){
    /*     logger.info(`[lostBet] Calculating lost bet`, {
            playerId: score.playerId,
            betId: score.betId
        }); */
    
        return {
            action: 'lost',
            data: {
                userId: score.playerId,
                betId: score.betId
            }
        };
    }


    static parseBets2v2 = (tier, sortedArray, winningTeamId = 1) => {
        const payload = {
            actions: []
        };
    
        // logger.info(`[parseBets] Parsing bets for tier`, { tier, sortedArraySize: sortedArray.length });
    
        sortedArray.forEach((score) => {
            let actionPayload = {};
            // Check if the player's teamId matches the winningTeamId
            if (score[1].teamId === winningTeamId) {
                // Apply winner logic for players on the winning team
                actionPayload = this.winnerBet(score[1],4, tier);
            } else {
                // Apply lost bet logic for players on other teams
                actionPayload = this.lostBet(score[1]);
            }
    
            payload.actions.push(actionPayload);
        });
    
        // logger.info(`[parseBets] Bets parsed`, { payload });
    
        return payload;
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
// export default new GameRulesService();