import React from "react";
import { Card } from "antd";
import articles from "./articles";


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
