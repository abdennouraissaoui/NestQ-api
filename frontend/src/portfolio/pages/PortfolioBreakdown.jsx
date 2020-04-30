import React, { useState, useEffect } from "react"
import { Alert, Spin, Typography } from 'antd';
import Analytics from "../../analysis/pages/Analytics"
import { useHttpClient } from "../../shared/hooks/http-hook"
import { useParams } from 'react-router-dom';

function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
}

const analyticsCategories = [
    { key: "performance", tab: "Performance" },
    { key: "attribution", tab: "Attribution" },
    { key: "riskMetrics", tab: "Risk Metrics" },
    { key: "diversification", tab: "Diversification" }
]

const PortfolioArena = () => {
    const portfolioName = decodeURIComponent(useParams().portfolioName);
    const [tearsheet, setTearsheet] = useState({})

    const { sendRequest, isLoading, error } = useHttpClient();
    useEffect(() => {
        const fetchPortfolioTearsheet = async () => {
            try {
                let responseData = await sendRequest(`/api/tearsheet/portfolio/${encodeURIComponent(portfolioName)}`)
                setTearsheet(responseData)
            } catch (e) { }
        }
        fetchPortfolioTearsheet();
    }, [sendRequest, portfolioName])


    return (
        <React.Fragment>

            {error && <Alert
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: "5px" }}
            />}
            {isLoading && <Spin size="large"></Spin>}
            {!isEmpty(tearsheet) && !error && !isLoading && <div style={{ margin: "auto", padding: 15, backgroundColor: "white", maxWidth: "1000px" }}>
                <Analytics
                    analyticsCategories={analyticsCategories}
                    tearsheet={tearsheet}
                    title={
                        <React.Fragment>
                            <Typography.Title level={3} className="center">Portfolio Analytics </Typography.Title>
                            <Typography.Text className="center"> For the period: {tearsheet.analysis_range.start} to {tearsheet.analysis_range.end}, using monthly returns</Typography.Text>
                        </React.Fragment>
                    } />
            </div>}
        </React.Fragment>
    )
}

export default PortfolioArena