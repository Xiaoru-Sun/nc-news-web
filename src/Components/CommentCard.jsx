import Votes from "./Votes";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/app";
function CommentCard(props) {
  const { comment } = props;

  const { accountName } = useContext(UserLoginContext);

  const [commentDeleted, setCommentDeleted] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = () => {
    deleteComment(comment.comment_id)
      .then(() => {
        setCommentDeleted(true);
      })
      .catch((err) => {
        setError(true);
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
    </>
  );
}

export default CommentCard;
