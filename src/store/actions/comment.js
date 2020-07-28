import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-forum';

export const commentFail = (parentId, error) => {
  return {
    type: actionTypes.COMMENT_FAIL,
    parentId,
    error
  };
};

export const createComment = (
  body,
  jetId,
  textId,
  linkId,
  commentableId,
  commentableType,
  parentId
) => dispatch => {
  const commentData = {
    comment: {
      body,
      text_id: textId,
      link_id: linkId,
      commentable_id: commentableId,
      commentable_type: commentableType,
      parent_id: parentId
    }
  };

  const uri = linkId
    ? `/api/jets/${jetId}/links/${linkId}/comments`
    : `/api/jets/${jetId}/texts/${textId}/comments`;

  return axios
    .post(uri, commentData)
    .then(response => response)
    .catch(err => dispatch(commentFail(parentId, err.response.data.errors)));
};

export const updateComment = (
  body,
  jetId,
  textId,
  linkId,
  commentableId,
  commentableType,
  commentId
) => dispatch => {
  const commentData = {
    comment: {
      body,
      text_id: textId,
      link_id: linkId,
      commentable_id: commentableId,
      commentable_type: commentableType
    }
  };

  const uri = linkId
    ? `/api/jets/${jetId}/links/${linkId}/comments/${commentId}`
    : `/api/jets/${jetId}/texts/${textId}/comments/${commentId}`;

  return axios
    .patch(uri, commentData)
    .then(response => response)
    .catch(err => dispatch(commentFail(err.response.data.errors)));
};

export const deleteComment = (jetId, textId, linkId, commentId) => dispatch => {
  const uri = linkId
    ? `/api/jets/${jetId}/links/${linkId}/comments/${commentId}`
    : `/api/jets/${jetId}/texts/${textId}/comments/${commentId}`;

  return axios
    .delete(uri)
    .then(response => response)
    .catch(err => dispatch(commentFail(err.response.data.errors)));
};
