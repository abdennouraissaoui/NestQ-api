import React from 'react';
import PortfolioItem from "./PortfolioItem"


const PortfolioList = ({ portfolios, portfolioNames, onDeletePortfolio, onEdited }) => {
    let cards = []
    portfolios.forEach(portflolio => {
        cards.push(
            <PortfolioItem
                key={portflolio.name}
                name={portflolio.name}
                holdings={portflolio.settings.holdings}
                allocation={portflolio.settings.allocation}
                optimizationStartDate={portflolio.settings.optimizationStartDate}
                optimizationEndDate={portflolio.settings.optimizationEndDate}
                rebalancingFrequency={portflolio.settings.rebalancingFrequency}
                targetReturn={portflolio.settings.targetReturn}
                targetVolatility={portflolio.settings.targetVolatility}
                portfolioNames={portfolioNames}
                onDelete={onDeletePortfolio}
                onEdited={onEdited}
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