import { useState } from "react";

function Votes() {
  const [votesNum, setVotesNum] = useState(0);
  const [voteTimes, setVoteTimes] = useState(0);
  const [unvoteTimes, setUnvoteTimes] = useState(0);

  const incrementVotes = () => {
    setVoteTimes(1);
    setVotesNum(votesNum + 1);
  };

  const decreaseVotes = () => {
    setUnvoteTimes(1);
    setVotesNum(votesNum - 1);
  };

  return (
    <div>
      <button
        className="upvote"
        onClick={incrementVotes}
        disabled={voteTimes === 1}
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

      <span>{votesNum}</span>
      <button
        className="downvote"
        onClick={decreaseVotes}
        disabled={unvoteTimes === 1}
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
