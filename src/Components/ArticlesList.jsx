import axios from "axios";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard.jsx";
import ReactLoading from "react-loading";
import { fetchAllArticles } from "../utils/app.js";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import "./articlelist.css";

function ArticlesList() {
  const [allArticles, setAllArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortby, setSortby] = useState("created_at");
  const [order, setOrder] = useState("DESC");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((preParams) => ({
      ...preParams,
      sort_by: sortby,
      order: order,
    }));
    fetchAllArticles(setLoading, sortby, order)
      .then((res) => {
        setLoading(false);
        setAllArticles(res.data.articles);
      })
      .catch((error) => {
        setError({ error });
      });
  }, [sortby, order]);

  return (
    <>
      {loading && (
        <ReactLoading
          className="loading"
          type="spinningBubbles"
          color="blue"
        ></ReactLoading>
      )}

      <div className="articlelist-top">
        <div className="articleslist-query sort-by">
          <label className="articlelist-label">Sort by</label>
          <select
            onChange={(e) => {
              setSortby(e.target.value);
            }}
          >
            <option value="created_at">Date</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comments</option>
          </select>
        </div>
        <div>
          <label>Order</label>
          <select
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
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
      {error && <ErrorPage errorMessage={error.error.message} />}
    </>
  );
}

export default ArticlesList;
