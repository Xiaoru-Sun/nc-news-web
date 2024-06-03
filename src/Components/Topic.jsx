import { useEffect, useState } from "react";
import { fetchArticlesByTopic } from "../utils/app";
import ReactLoading from "react-loading";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage";

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
      <ul style={{ margin: 0, padding: 0 }}>
        {articlesOfTopic.map((article) => {
          return (
            <li className="articlecard-item" key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default Topic;
