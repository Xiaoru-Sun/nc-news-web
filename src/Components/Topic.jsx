import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ReactLoading from "react-loading";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";
import "./topic.css";

function Topic(props) {
  const { topic } = props;
  const [articlesOfTopic, setArticlesOfTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchArticlesByTopic(topic)
      .then((res) => {
        setLoading(false);
        setArticlesOfTopic(res.data.articles);
      })
      .catch((error) => {
        setError({ error });
      });
  }, [topic]);

  return (
    <>
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}
      {error && <ErrorPage errorMessage={error.error.message}></ErrorPage>}
      <ul className="topic-flex">
        {articlesOfTopic.map((article) => {
          return (
            <li className="topic-flexitem" key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Topic;
