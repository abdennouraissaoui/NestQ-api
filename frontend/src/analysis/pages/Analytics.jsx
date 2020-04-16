import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import Performance from "../components/Performance"
import Attribution from "../components/Attribution"
import RiskMetrics from "../components/RiskMetrics"
import Diversification from "../components/Diversification"
import Recommendations from "../components/Recommendations"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { Spin, Alert } from "antd"


const Analytics = () => {
    const [currentTab, setCurrentTab] = useState('performance')
    const [portfolioTearsheet, setPortfolioTearsheet] = useState({})
    const { error, sendRequest, isLoading } = useHttpClient();
    const portfolioName = useParams().portfolioName;

    useEffect(() => {
        const fetchPortfolioTearsheet = async () => {
            try {
                let responseData = await sendRequest(`/api/tearsheet/${portfolioName}`)
                setPortfolioTearsheet(responseData)
            } catch (e) {}
        }
        fetchPortfolioTearsheet();
    }, [sendRequest, portfolioName])

    const analyticsCategories = [
        { key: "performance", tab: "Performance" },
        { key: "attribution", tab: "Attribution" },
        { key: "riskMetrics", tab: "Risk Metrics" },
        { key: "diversification", tab: "Diversification" },
        { key: "recommendations", tab: "Recommendations" }
    ]

    const contentList = {
        performance: <Performance
            inv_growth={portfolioTearsheet.inv_growth}
            drawdowns={portfolioTearsheet.drawdowns}
            calendar_rets={portfolioTearsheet.calendar_rets}
        />,
        attribution: <Attribution
            ff_exp={portfolioTearsheet.ff_exp}
        />,
        riskMetrics: <RiskMetrics
            risk_metrics={portfolioTearsheet.risk_metrics}
        />,
        diversification: <Diversification correlation={portfolioTearsheet.correlation} pca={portfolioTearsheet.PCA}/>,
        recommendations: <Recommendations />
    }

    return (
        <React.Fragment>
            {isLoading && <Spin size="large"></Spin>}
            {!isLoading && error && <Alert message={error}></Alert>}
            {Object.keys(portfolioTearsheet).length > 0 && !isLoading && !error && <Card
                style={{ width: '95%' }}
                title="Fund analysis"
                tabList={analyticsCategories}
                activeTabKey={currentTab}
                onTabChange={key => setCurrentTab(key)}
                type="inner"
            >
                {contentList[currentTab]}
            </Card>}

        </React.Fragment>
    )
}

export default Analytics;