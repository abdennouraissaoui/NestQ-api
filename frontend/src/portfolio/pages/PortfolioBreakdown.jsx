import React, { useState, useEffect } from "react";
import { Alert, Spin, Typography, Layout } from "antd";
import Analytics from "../../analysis/pages/Analytics";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useParams } from "react-router-dom";
import PortfolioAnalysisForm from "../components/PortfolioAnalysisForm"

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

const { Sider, Content } = Layout;

const analyticsCategories = [
  { key: "performance", tab: "Performance" },
  { key: "attribution", tab: "Attribution" },
  { key: "riskMetrics", tab: "Risk Metrics" },
  { key: "diversification", tab: "Diversification" },
];

const PortfolioArena = () => {
  const portfolioName = decodeURIComponent(useParams().portfolioName);
  const [tearsheet, setTearsheet] = useState({});
  const [analysisSettings, setAnalysisSettings] = useState({});

  const { sendRequest, isLoading, error } = useHttpClient();
  useEffect(() => {
    const fetchPortfolioTearsheet = async () => {
      try {
        let responseData = await sendRequest(
          `/api/tearsheet/portfolio/${encodeURIComponent(portfolioName)}`,
          "POST",
          JSON.stringify(analysisSettings),
          {
            "Content-Type": "application/json",
          }
        );
        setTearsheet(responseData);
      } catch (e) {}
    };
    fetchPortfolioTearsheet();
  }, [sendRequest, portfolioName, analysisSettings]);

  const handleGo = (settings) => {
    setAnalysisSettings(settings);
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      {!isEmpty(tearsheet) && (
        <Sider
          breakpoint="md"
          collapsedWidth="0"
          theme="light"
          width={350}
          style={{ padding: 10 }}
        >
          <PortfolioAnalysisForm
            analysisStartDate={tearsheet.analysis_range.start}
            analysisEndDate={tearsheet.analysis_range.end}
            onGo={handleGo}
          />
        </Sider>
      )}
      {error && (
        <Alert
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: "5px" }}
        />
      )}
      {isLoading && <Spin size="large"></Spin>}
      
      
      {!isEmpty(tearsheet) && !error && !isLoading && <Content style={{ margin: 0, paddingTop: 10, backgroundColor: "white", maxWidth: "1000px" }}>
          <Analytics
            analyticsCategories={analyticsCategories}
            tearsheet={tearsheet}
            title={
              <React.Fragment>
                <Typography.Title level={3} className="center">
                  Portfolio Analytics
                </Typography.Title>
                <Typography.Text className="center">
                  For the period: {tearsheet.analysis_range.start} to
                  {tearsheet.analysis_range.end}, using monthly returns
                </Typography.Text>
              </React.Fragment>
            }
          />
      </Content>}
    </Layout>
  );
};

export default PortfolioArena;
