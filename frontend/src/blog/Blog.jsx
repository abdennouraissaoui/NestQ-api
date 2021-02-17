import React from "react";
import { Card } from "antd";

const articles = [
  {
    title: "Momentum and Markowitz: A Golden Combination (Paper review)",
    date: "2020-10-20",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQHETwDO39NuCQ/article-cover_image-shrink_423_752/0/1602760684014?e=1618444800&v=beta&t=-g0Rgcp-6iAeF2q3X89YzmdU5Q-D4riUldSjuKVDBbw",
    imageAltText: "Momentum",
    link:
      "https://www.linkedin.com/pulse/momentum-markowitz-golden-combination-paper-review-abdennour-aissaoui/",
  },
  {
    title: "Portfolio Optimization Using A Biased Covariance Matrix",
    date: "2020-07-14",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQH9Z-MdOiFr8g/article-cover_image-shrink_720_1280/0/1594596881859?e=1618444800&v=beta&t=8h7uKWar3HvO6aCc6gKVQID43H2aQ9q6T35cxmA_4Vg",
    imageAltText: "Forecasting volatility",
    link:
      "https://www.linkedin.com/pulse/portfolio-optimization-using-biased-covariance-matrix-aissaoui",
  },
  {
    title: "Can Past Volatility Be Indicative of Future Volatility?",
    date: "2020-07-07",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQH3LBaHPLyaxg/article-cover_image-shrink_720_1280/0/1593993449756?e=1618444800&v=beta&t=u6bALiqXe-uEGTxhM3jt84MvLdujU3gSEELL_31f57w",
    imageAltText: "Forecasting volatility",
    link:
      "https://www.linkedin.com/pulse/can-past-volatility-indicative-future-python-code-abdennour-aissaoui/",
  },
  {
    title: "4 Lessons Learned on Portfolio Optimization",
    date: "2020-06-29",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4D12AQHWY_BjsFs-vQ/article-cover_image-shrink_720_1280/0/1593362594162?e=1618444800&v=beta&t=NIUtBOFX5xbaEdwzxJv-dS27CuXQzDzsEKk_ykhsZd0",
    imageAltText: "Efficient Frontier",
    link:
      "https://www.linkedin.com/pulse/4-lessons-learned-portfolio-optimization-abdennour-aissaoui/",
  },
  {
    title: "Dual Momentum: Pre- and post-publication performance",
    date: "2021-02-17",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQF9eDW3CSy1vA/article-cover_image-shrink_423_752/0/1613572423485?e=1619049600&v=beta&t=OKLxFGhDfdlypcqzxp4N0fHCmC1n552RWNxaRcCOt_M",
    imageAltText: "Dual Momentum",
    link:
      "https://www.linkedin.com/pulse/dual-momentum-pre-post-publication-performance-abdennour-aissaoui/",
  },
];

const Blog = () => {
  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {articles.map((article, index) => {
        return (
          <Card
            key={index}
            hoverable
            style={{
              maxWidth: "600px",
              width: "90%",
              margin: "auto",
              marginBottom: "15px",
            }}
            cover={
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <img src={article.imageUrl} alt={article.imageAltText} />
              </a>
            }
          >
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              <Card.Meta title={article.title} description={article.date} />
            </a>
          </Card>
        );
      })}
    </div>
  );
};

export default Blog;
