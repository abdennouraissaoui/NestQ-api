import React, { useState } from "react"
import { Card } from 'antd';
import Performance from "../components/Performance"
import Attribution from "../components/Attribution"
import RiskMetrics from "../components/RiskMetrics"
import Diversification from "../components/Diversification"


const Analytics = ({ tearsheet, isLoading, title }) => {
    const [currentTab, setCurrentTab] = useState('performance')



    const analyticsCategories = [
        { key: "performance", tab: "Performance" },
        { key: "attribution", tab: "Attribution" },
        { key: "riskMetrics", tab: "Risk Metrics" },
        { key: "diversification", tab: "Correlation" }
    ]

    const contentList = {
        performance: <Performance
            inv_growth={tearsheet.inv_growth}
            drawdowns={tearsheet.drawdowns}
            calendar_rets={tearsheet.calendar_rets}
        />,
        attribution: <Attribution ff_exp={tearsheet.ff_exp} />,
        riskMetrics: <RiskMetrics risk_metrics={tearsheet.risk_metrics} />,
        diversification: <Diversification correlation={tearsheet.correlation} pca={tearsheet.PCA} />
    }

    return (
        <React.Fragment>
            {
                <Card
                    style={{ marginTop: 0 }}
                    type="inner"
                    title={title}
                    tabList={analyticsCategories}
                    activeTabKey={currentTab}
                    onTabChange={key => setCurrentTab(key)}
                    
                >
                    {isLoading && <h2>Loading...</h2>}
                    {contentList[currentTab]}
                </Card>}

        </React.Fragment>
    )
}

export default Analytics;