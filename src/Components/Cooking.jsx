import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";

function Cooking() {
  const [cookingArticles, setCookingArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchArticlesByTopic("cooking")
      .then((res) => {
        setCookingArticles(res.data.articles);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  return (
    <>
      <ul>
        {cookingArticles.map((article) => {
          return (
            <li className="articlecard-item" key={article.article_id}>
              {<ArticleCard article={article}></ArticleCard>}
            </li>
          );
        })}
      </ul>
      {error && <p>Error! Please refresh the page</p>}
    </>
  );
}

export default Cooking;
