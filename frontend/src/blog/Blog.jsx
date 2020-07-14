import React from "react";
import { Card } from "antd";

const articles = [
  {
    title: "Portfolio Optimization Using A Biased Covariance Matrix",
    date: "2020-07-14",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQH9Z-MdOiFr8g/article-cover_image-shrink_720_1280/0?e=1600300800&v=beta&t=7o6d8SaqNWNnRJCaurkPBy7eL4tahKKNX1dsBzTs6ac",
    imageAltText: "Forecasting volatility",
    link:
      "https://www.linkedin.com/pulse/portfolio-optimization-using-biased-covariance-matrix-aissaoui",
  },
  {
    title: "Can Past Volatility Be Indicative of Future Volatility?",
    date: "2020-07-07",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C5612AQH3LBaHPLyaxg/article-cover_image-shrink_720_1280/0?e=1599696000&v=beta&t=okK7-vi01pduYus7ytQVj8Xpi-tbT2ubA7_t1Q0dv6Q",
    imageAltText: "Forecasting volatility",
    link:
      "https://www.linkedin.com/pulse/can-past-volatility-indicative-future-python-code-abdennour-aissaoui/",
  },
  {
    title: "4 Lessons Learned on Portfolio Optimization",
    date: "2020-06-29",
    imageUrl:
      "https://media-exp1.licdn.com/dms/image/C4D12AQHWY_BjsFs-vQ/article-cover_image-shrink_423_752/0?e=1599091200&v=beta&t=k25YrZpAOfpY6EOsfRXlpQurPNy8U_qWvQtFUltiDOA",
    imageAltText: "Efficient Frontier",
    link:
      "https://www.linkedin.com/pulse/4-lessons-learned-portfolio-optimization-abdennour-aissaoui/",
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
