import Votes from "./Votes";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/app";
import ErrorPage from "./ErrorPage";

function CommentCard(props) {
  const { comment } = props;

  const { accountName } = useContext(UserLoginContext);

  const [commentDeleted, setCommentDeleted] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    deleteComment(comment.comment_id)
      .then(() => {
        setCommentDeleted(true);
      })
      .catch((error) => {
        setError({ error });
      });
  };

  return (
    <>
      {!commentDeleted && (
        <div>
          <p>{comment.comment_id}</p>
          <p>{comment.author}</p>
          <p>{comment.body}</p>
          {accountName === comment.author && (
            <button
              disabled={commentDeleted}
              onClick={() => {
                handleDelete();
              }}
            >
              delete
            </button>
          )}
        </div>
      )}
      {commentDeleted && <p>comment deleted by user</p>}
      {error && <ErrorPage errorMessage={error.error.message} />}
    </>
  );
}

export default CommentCard;
