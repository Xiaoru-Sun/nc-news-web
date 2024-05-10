import { useState } from "react";
import { patchArticleVote } from "../utils/app";
import ErrorPage from "./ErrorPage";

function Votes(props) {
  const { article } = props;
  const [displayVoteNum, setDisplayVoteNum] = useState(article.votes);
  const [voteTimes, setVoteTimes] = useState(0);
  const [unvoteTimes, setUnvoteTimes] = useState(0);
  const [error, setError] = useState(null);
  const [voteOnServerUpdated, setVoteOnServerUpdated] = useState(false);

  const handlePatch = (voteChange) => {
    patchArticleVote(article, voteChange)
      .then((res) => {
        setVoteOnServerUpdated(true);
        setTimeout(() => {
          setVoteOnServerUpdated(false);
        }, 1000);
      })
      .catch((error) => {
        setError({ error });
      });
  };

  const incrementVotes = () => {
    //to disable the vote button
    setVoteTimes(1);
    //update the UI right away
    setDisplayVoteNum(displayVoteNum + 1);
    //send request to server that responds with res.data.updatedArticle
    handlePatch(1);
  };

  const decreaseVotes = () => {
    setUnvoteTimes(1);
    setDisplayVoteNum(displayVoteNum - 1);
    handlePatch(-1);
  };

  return (
    <div>
      {voteOnServerUpdated && <p>Vote updated successfully!</p>}
      {error && <ErrorPage errorMessage={error.error.message} />}
      <button
        className="upvote"
        onClick={() => {
          incrementVotes();
        }}
        disabled={voteTimes === 1 && !error}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70px"
          height="18px"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="miter"
        >
          <polygon
            points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"
            fill="#059cf7"
            opacity="0.1"
            strokeWidth="0"
          />
          <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14" />
        </svg>
      </button>

      <span>{displayVoteNum}</span>
      <button
        className="downvote"
        onClick={() => {
          decreaseVotes();
        }}
        disabled={unvoteTimes === 1 && !error}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60px"
          height="17px"
          viewBox="0 0 23 23"
          fill="none"
          stroke="#000000"
          w="1"
          strokeLinecap="round"
          strokeLinejoin="miter"
        >
          <polygon
            points="21 10 12 21 3 10 8 10 8 2 16 2 16 10 21 10"
            fill="#059cf7"
            opacity="0.1"
            w="0"
          />
          <polygon points="21 10 12 21 3 10 8 10 8 2 16 2 16 10 21 10" />
        </svg>
      </button>
    </div>
  );
}

export default Votes;
