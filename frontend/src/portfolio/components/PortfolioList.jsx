import React from 'react';
import PortfolioItem from "./PortfolioItem"
import AddPortfolioCard from "./AddPortfolioCard"
import DataFormatter from "../../shared/utils/DataFormatter"

const tickerNameMap = DataFormatter.swapKeyValue(require("./name_ticker_map.json"))

const PortfolioList = ({ portfolios, openPortForm, onDeletePortfolio, onEdited, closeForm }) => {
    let cards = []
    portfolios.forEach(portflolio => {
        portflolio.settings.holdings = DataFormatter.renameKeys(tickerNameMap, portflolio.settings.holdings)
        cards.push(
            <PortfolioItem
                key={portflolio.name}
                name={portflolio.name}
                holdings={portflolio.settings.holdings}
                allocation={portflolio.settings.allocation}
                optimizationStartDate={portflolio.settings.optimizationStartDate}
                optimizationEndDate={portflolio.settings.optimizationEndDate}
                rebalancingFrequency={portflolio.settings.rebalancingFrequency}
                onDelete={onDeletePortfolio}
                onEdited={onEdited}
            />
        )
    });

    const addPortfolioCard = (<AddPortfolioCard openPortForm={openPortForm} closeForm={closeForm} />)
    return (
        <div>
            {portfolios.length === 0 && <h2> No portfolios found. Maybe create one? </h2>}
            {addPortfolioCard}
            {cards}
        </div>
    )

}
export default PortfolioList;