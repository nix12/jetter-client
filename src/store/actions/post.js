import axios from '../../services/axios/axios-forum';

export const createPost = (title, body, jetId) => dispatch => {
  const postData = {
    title,
    body,
    jet_id: jetId
  };

  return axios
    .post(`/api/jets/${jetId}/posts`, postData)
    .then(response => response)
    .catch(err => console.log(err.response.data.error));
};

export const updatePost = (title, body, jetId, postId) => dispatch => {
  const postData = {
    post: {
      title,
      body,
      jet_id: jetId,
      post_id: postId
    }
  };

  return axios
    .put(`/api/jets/${jetId}/posts/${postId}`, postData)
    .then(response => response)
    .catch(err => console.log(err.response.data.error));
};

export const deletePost = postId => dispatch => {};
