import moment from "moment";
import { Link } from "react-router-dom";
import Votes from "./Votes";
import "./articlecard.css";

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
      </div>
    </>
  );
}

export default ArticleCard;
