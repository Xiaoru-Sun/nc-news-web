import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";
import ReactLoading from "react-loading";

function Cooking() {
  const [cookingArticles, setCookingArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic("cooking")
      .then((res) => {
        setLoading(false);
        setCookingArticles(res.data.articles);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  return (
    <>
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}
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
