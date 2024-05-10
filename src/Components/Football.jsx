import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";
import ReactLoading from "react-loading";
import ErrorPage from "./ErrorPage";

function Football() {
  const [ftArticles, setFtArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic("football")
      .then((res) => {
        setLoading(false);
        setFtArticles(res.data.articles);
      })
      .catch((error) => {
        setError({ error });
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
      {error && <ErrorPage errorMessage={error.error.message} />}
    </>
  );
}

export default Football;
