import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ArticleCard from "./ArticleCard";
import ReactLoading from "react-loading";

function Coding() {
  const [codingArticles, setCodingArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic("coding")
      .then((res) => {
        setLoading(false);
        setCodingArticles(res.data.articles);
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
        {codingArticles.map((article) => {
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

export default Coding;
