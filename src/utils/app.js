import axios from "axios";

export const fetchAllArticles = (setLoading, setAllArticles, setError) => {
  setLoading(true);
  axios
    .get("https://project-nc-news-xiaoru-sun.onrender.com/api/articles")
    .then((res) => {
      setLoading(false);
      setAllArticles(res.data.articles);
    })
    .catch(() => {
      setError(true);
    });
};

export const fetchSingleArtile = (
  article_id,
  setLoading,
  setArticle,
  setError
) => {
  setLoading(true);
  axios
    .get(
      `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article_id}`
    )
    .then((res) => {
      setLoading(false);
      setArticle(res.data.article);
    })
    .catch(() => {
      setError(true);
    });
};

export const fetchComments = (
  article_id,
  setLoading,
  setComments,
  setError
) => {
  setLoading(true);
  axios
    .get(
      `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article_id}/comments`
    )
    .then((res) => {
      setLoading(false);
      setComments(res.data.comments);
    })
    .catch(() => {
      setError(true);
    });
};
