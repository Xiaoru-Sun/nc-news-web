import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";
import ReactLoading from "react-loading";
function Football() {
  const [ftArticles, setFtArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic("football")
      .then((res) => {
        setLoading(false);
        setFtArticles(res.data.articles);
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
        {ftArticles.map((article) => {
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

export default Football;
