import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import moment from "moment";
import Votes from "./Votes";
import Expandable from "./Expandable";
import CommentList from "./CommentList";
import { fetchSingleArtile } from "../utils/app";
import ErrorPage from "./ErrorPage";

function SingleArticle() {
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(false);
  const createdDate = moment.utc(article.created_at).format("MMM Do YY");
  const createdDateFromNow = moment(createdDate, "MMM Do YY").fromNow();

  useEffect(() => {
    fetchSingleArtile(article_id, setLoading)
      .then((res) => {
        setLoading(false);
        setArticle(res.data.article);
      })
      .catch((error) => {
        setError({ error });
      });
  }, [article_id]);

  return (
    <>
      {error && <ErrorPage errorMessage={error.error.message} />}
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}
      {Object.keys(article).length > 0 && (
        <>
          <article>
            <p>{article.author}</p>
            <p>{createdDateFromNow}</p>
            <h3>{article.title}</h3>
            <img src={article.article_img_url}></img>
            <p>{article.body}</p>
          </article>
          <Votes article={article}></Votes>
          <Expandable>
            <CommentList article_id={article_id}></CommentList>
          </Expandable>
        </>
      )}
    </>
  );
}

export default SingleArticle;
