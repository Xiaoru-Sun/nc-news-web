import axios from "axios";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";

function ArticlesList() {
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get("https://project-nc-news-xiaoru-sun.onrender.com/api/articles")
      .then((res) => {
        setAllArticles(res.data.articles);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  return (
    <>
      <div className="articlelist-top">
        <div className="articleslist-query sort-by">
          <label className="articlelist-label">Sort by</label>
          <select>
            <option id="option1">Sort by</option>
            <option>New</option>
            <option>Old</option>
            <option>Comments</option>
          </select>
        </div>
        <div className="articleslist-query page">
          <label className="articlelist-label">Page</label>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <button id="articleslist-apply">Apply</button>
      </div>

      <ul className="articlecard-container">
        {allArticles.map((article) => {
          return (
            <li className="articlecard-item" key={article.article_id}>
              {<ArticleCard article={article}></ArticleCard>}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ArticlesList;
