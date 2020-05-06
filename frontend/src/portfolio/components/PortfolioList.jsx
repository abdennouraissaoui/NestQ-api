import React from 'react';
import PortfolioItem from "./PortfolioItem"


const PortfolioList = ({ portfolios, onDeletePortfolio, onEdited, colors, onCreated }) => {
    let cards = []
    portfolios.forEach((portflolio, index) => {
        cards.push(
            <PortfolioItem
                key={index}
                name={portflolio.name}
                holdings={portflolio.settings.holdings}
                allocation={portflolio.settings.allocation}
                optimizationStartDate={portflolio.settings.optimizationStartDate}
                optimizationEndDate={portflolio.settings.optimizationEndDate}
                rebalancingFrequency={portflolio.settings.rebalancingFrequency}
                targetReturn={portflolio.settings.targetReturn}
                targetVolatility={portflolio.settings.targetVolatility}
                colors={colors}
                onDelete={onDeletePortfolio}
                onEdited={onEdited}
                onCreated={onCreated}
            />
        )
    });

    return (
        <div>
            {portfolios.length === 0 && <h2> No portfolios found. Maybe create one? </h2>}
            {cards}
        </div>
    )

}
export default PortfolioList;