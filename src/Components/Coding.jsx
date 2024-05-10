import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";
import ReactLoading from "react-loading";
import ErrorPage from "./ErrorPage";

function Coding() {
  const [codingArticles, setCodingArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic("coding")
      .then((res) => {
        setLoading(false);
        setCodingArticles(res.data.articles);
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
        {codingArticles.map((article) => {
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

export default Coding;
