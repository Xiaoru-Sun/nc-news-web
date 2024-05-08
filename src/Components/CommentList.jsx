import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import CommentCard from "./CommentCard";
import { fetchComments, postComment } from "../utils/app";

function CommentList(props) {
  const { article_id } = props;
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [postCommentTimes, setPostCommentTimes] = useState(0);

  useEffect(() => {
    fetchComments(article_id, setLoading, setComments, setError);
  }, [article_id]);

  const handleAddComment = (e) => {
    e.preventDefault();
    setPostCommentTimes(1);
    postComment(article_id, userNameInput, commentInput)
      .then((res) => {
        setComments([res.data.postedComment, ...comments]);
        setCommentInput("");
        setUserNameInput("");
        setShowCommentInput(false);
      })
      .catch(() => {
        setPostCommentTimes(0);
        setError(true);
      });
  };
  return (
    <>
      {error && <p>Error!</p>}
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}
      <button onClick={() => setShowCommentInput(true)}>Add a comment</button>
      {showCommentInput && (
        <form onSubmit={handleAddComment}>
          <input
            required
            type="text"
            placeholder="please add your username"
            onChange={(e) => setUserNameInput(e.target.value)}
          ></input>
          <input
            required
            type="text"
            placeholder="add your comment here"
            onChange={(e) => setCommentInput(e.target.value)}
          ></input>
          <button
            type="button"
            onClick={() => {
              setShowCommentInput(false);
            }}
          >
            cancle
          </button>
          <button type="submit" disabled={postCommentTimes === 1}>
            add
          </button>
        </form>
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
    </>
  );
}

export default CommentList;
