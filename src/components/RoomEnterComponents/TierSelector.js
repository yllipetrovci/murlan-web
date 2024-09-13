const TierSelector = ({ TIERS, selectedTire, handleOnChangeTiers }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
            {TIERS.map((tier, index) => (
                <label key={index} style={{ border: '1px solid black', width: 200 }}>
                    <input
                        type="radio"
                        value={tier.id}
                        checked={selectedTire === tier.id.toString()}
                        onChange={handleOnChangeTiers}
                    />
                    {tier.slug} | Stake: {tier.stake}
                </label>
            ))}
        </div>
    );
};

export default TierSelector;
