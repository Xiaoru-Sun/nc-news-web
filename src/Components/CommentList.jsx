import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import CommentCard from "./CommentCard";
import { fetchComments } from "../utils/app";

function CommentList(props) {
  const { article_id } = props;
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments(article_id, setLoading, setComments, setError);
  }, [article_id]);

  return (
    <>
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}

      <ul className="commentcard-container">
        {comments.map((comment) => {
          return (
            <li className="commentcard-list" key={comment.comment_id}>
              <CommentCard comment={comment}></CommentCard>
            </li>
          );
        })}
      </ul>

      {error && <p>Error!</p>}
    </>
  );
}

export default CommentList;
