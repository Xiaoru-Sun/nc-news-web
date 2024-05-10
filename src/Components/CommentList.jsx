import { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import CommentCard from "./CommentCard";
import { fetchComments, postComment } from "../utils/app";
import ErrorPage from "./ErrorPage";
import { UserLoginContext } from "../Contexts/UserLogin";

function CommentList(props) {
  const { article_id } = props;
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [userNameInput, setUserNameInput] = useState("");
  const [postCommentTimes, setPostCommentTimes] = useState(0);
  const { userLoggedin, accountName } = useContext(UserLoginContext);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchComments(article_id, setLoading)
      .then((res) => {
        setLoading(false);
        setComments(res.data.comments);
      })
      .catch((error) => {
        setError({ error });
      });
  }, [article_id]);

  const handleAddComment = () => {
    if (!userLoggedin) {
      setIsOpen(true);
    } else {
      setShowCommentInput(true);
      setUserNameInput(accountName);
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    setPostCommentTimes(1);
    postComment(article_id, userNameInput, commentInput)
      .then((res) => {
        setComments([res.data.postedComment, ...comments]);
        setCommentInput("");
        setUserNameInput("");
        setShowCommentInput(false);
      })
      .catch((error) => {
        setPostCommentTimes(0);
        setError({ error });
      });
  };
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
      <button
        onClick={() => {
          handleAddComment();
        }}
      >
        Add a comment
      </button>
      {isOpen && (
        <div className="commentlist-popup">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <p>Please sign in to leave a comment</p>
        </div>
      )}
      {showCommentInput && userLoggedin && (
        <form onSubmit={handleSubmitComment}>
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
