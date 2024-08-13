const Table = ({ cards, customStyle }) => {
    const cardIcons = {
        Hearts: "♥", Diamonds: "♦", Clubs: "♣", Spades: "♠"
    }
    
    return (
        <div style={{ display: 'flex', flexDirection: 'row', ...customStyle, border: '1px solid black', width: 200, height: 200 }}>
            <p>Table</p>


            {cards && cards.map((card, index) => {
                return (
                    <div key={card.id} style={{
                        width: 100,
                        border: '3px solid green',
                        height: 200,
                    }}>
                        <p>{card.name}</p>
                        <p>{card.suit}</p>
                        <span style={{ fontSize: 24 }}>
                            {cardIcons[card.suit]}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}


export default Table;