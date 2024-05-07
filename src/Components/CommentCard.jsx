import Votes from "./Votes";

function CommentCard(props) {
  const { comment } = props;

  return (
    <>
      <p>{comment.author}</p>
      <p>{comment.body}</p>
      <Votes></Votes>
    </>
  );
}

export default CommentCard;
