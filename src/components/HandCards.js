import { useEffect } from "react";

const HandCards = ({ player, selectedCards, onClickCard, isYourTurn }) => {
    const cardIcons = {
        Hearts: "♥", Diamonds: "♦", Clubs: "♣", Spades: "♠"
    }

    // debugger;
    console.log('HandCards');
    console.log(player);
    return (
        <div style={{
            display: 'flex',
            border: '1px solid black',
            justifyContent: 'flex-start',
        }}>
            {player && player?.hand.map((card, index) => {
                const isSelected = selectedCards.filter(selectedCard => (selectedCard.id === card.id)).length > 0;
                return (
                    <div key={index + "_" + card.suit + "_" + card.id} onClick={() => isYourTurn && onClickCard(card)} style={{
                        width: 100,
                        border: '3px solid green',
                        height: 200,
                    }}>
                        {isSelected && <p style={{ color: 'red' }}>Selected</p>}
                        <p>{card.name}</p>
                        <p>{card.suit}</p>
                        <span style={{ fontSize: 24 }}>
                            {cardIcons[card.suit]}
                        </span>
                    </div>)
            })
            }
        </div>
    )
};

export default HandCards;