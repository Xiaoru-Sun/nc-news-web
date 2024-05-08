import moment from "moment";
import { Link } from "react-router-dom";
import Votes from "./Votes";

function ArticleCard(props) {
  const { article } = props;
  const createdDate = moment.utc(article.created_at).format("MMM Do YY");
  const topic = article.topic[0].toUpperCase() + article.topic.slice(1);

  return (
    <>
      <article>
        <div className="artilecard-header">
          <p id="articlecard-topic">
            {topic} {"\t"}
          </p>
          <p id="articlecard-author">
            author: {"\t"} {article.author}
          </p>
          <p id="articlecard-date">
            {moment(createdDate, "MMM Do YY").fromNow()}
          </p>
        </div>
        <Link to={`/articles/${article.article_id}`}>
          <h4 className="artilecard-title">{article.title}</h4>
        </Link>
        <Link to={`/articles/${article.article_id}`}>
          <img alt="img of article" src={article.article_img_url}></img>
        </Link>
      </article>

      <div className="articlecard-buttom">
        <Votes article={article}></Votes>
        <button>
          <svg
            width="70px"
            height="18px"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.1 5.00016H6.9C6.53425 4.99455 6.18126 5.13448 5.9187 5.38917C5.65614 5.64385 5.50553 5.99242 5.5 6.35816V14.5002C5.50553 14.8659 5.65614 15.2145 5.9187 15.4692C6.18126 15.7238 6.53425 15.8638 6.9 15.8582H10.77C10.9881 15.857 11.2035 15.9056 11.4 16.0002L17.051 19.0002L17 14.5002H18.43C19.0106 14.5091 19.4891 14.0467 19.5 13.4662V6.35816C19.4945 5.99242 19.3439 5.64385 19.0813 5.38917C18.8187 5.13448 18.4657 4.99455 18.1 5.00016Z"
              stroke="#000000"
              w="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 8.25024C8.08579 8.25024 7.75 8.58603 7.75 9.00024C7.75 9.41446 8.08579 9.75024 8.5 9.75024V8.25024ZM16.5 9.75024C16.9142 9.75024 17.25 9.41446 17.25 9.00024C17.25 8.58603 16.9142 8.25024 16.5 8.25024V9.75024ZM8.5 11.2502C8.08579 11.2502 7.75 11.586 7.75 12.0002C7.75 12.4145 8.08579 12.7502 8.5 12.7502V11.2502ZM14.5 12.7502C14.9142 12.7502 15.25 12.4145 15.25 12.0002C15.25 11.586 14.9142 11.2502 14.5 11.2502V12.7502ZM8.5 9.75024H16.5V8.25024H8.5V9.75024ZM8.5 12.7502H14.5V11.2502H8.5V12.7502Z"
              fill="#0000"
            />
          </svg>
        </button>
        <button>
          <svg
            width="60px"
            height="18px"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              r="evenodd"
              clipRule="evenodd"
              d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
              fill="#080341"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default ArticleCard;
