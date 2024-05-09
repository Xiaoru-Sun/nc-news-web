import Votes from "./Votes";
import { UserLoginContext } from "../Contexts/UserLogin";
import { useContext, useState } from "react";
import { deleteComment } from "../utils/app";
function CommentCard(props) {
  const { comment } = props;

  const { accountName } = useContext(UserLoginContext);

  const [commentDeleted, setCommentDeleted] = useState(false);

  const handleDelete = () => {
    setCommentDeleted(true);
    deleteComment(comment.comment_id);
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
