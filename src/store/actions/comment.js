import axios from '../../services/axios/axios-forum';

export const createComment = (
  body,
  jetId,
  postId,
  commentableId,
  commentableType,
  parentId
) => dispatch => {
  const commentData = {
    comment: {
      body,
      post_id: postId,
      commentable_id: commentableId,
      commentable_type: commentableType,
      parent_id: parentId
    }
  };

  return axios
    .post(`/api/jets/${jetId}/posts/${postId}/comments`, commentData)
    .then(response => response)
    .catch(err => console.log(err.response.data.error));
};

export const updateComment = (title, description) => dispatch => {};
export const deleteComment = postId => dispatch => {};
