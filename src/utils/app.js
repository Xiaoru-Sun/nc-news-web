import axios from "axios";

export const fetchAllArticles = (setLoading, sortby, order) => {
  setLoading(true);
  return axios.get(
    "https://project-nc-news-xiaoru-sun.onrender.com/api/articles",
    { params: { sort_by: sortby, order: order } }
  );
};

export const fetchSingleArtile = (article_id) => {
  return axios.get(
    `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article_id}`
  );
};

export const fetchComments = (article_id, setLoading) => {
  setLoading(true);
  return axios.get(
    `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article_id}/comments`
  );
};

export const patchArticleVote = (article, voteChange) => {
  return axios.patch(
    `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article.article_id}`,
    { inc_votes: voteChange }
  );
};

export const postComment = (article_id, userName, comment) => {
  return axios.post(
    `https://project-nc-news-xiaoru-sun.onrender.com/api/articles/${article_id}/comments`,
    {
      username: userName,
      body: comment,
    }
  );
};

export const deleteComment = (comment_id) => {
  return axios.delete(
    `https://project-nc-news-xiaoru-sun.onrender.com/api/comments/${comment_id}`
  );
};

export const fetchArticlesByTopic = (topic) => {
  return axios.get(
    "https://project-nc-news-xiaoru-sun.onrender.com/api/articles",
    {
      params: {
        topic: topic,
      },
    }
  );
};

export const fetchAllUsers = () => {
  return axios.get("https://project-nc-news-xiaoru-sun.onrender.com/api/users");
};
