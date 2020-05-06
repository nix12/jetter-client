import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-forum';

export const textFail = error => {
  return {
    type: actionTypes.TEXT_FAIL,
    error
  };
};

export const createText = (title, body, jetId) => dispatch => {
  const textData = {
    title,
    body,
    jet_id: jetId
  };

  return axios
    .post(`/api/jets/${jetId}/texts`, textData)
    .then(response => response)
    .catch(err => dispatch(textFail(err.response.data.errors)));
};

export const updateText = (title, body, jetId, textId) => dispatch => {
  const textData = {
    text: {
      title,
      body,
      jet_id: jetId,
      text_id: textId
    }
  };

  return axios
    .put(`/api/jets/${jetId}/texts/${textId}`, textData)
    .then(response => response)
    .catch(err => dispatch(textFail(err.response.data.errors)));
};

export const deleteText = (jetId, textId) => dispatch => {
  return axios
    .delete(`/api/jets/${jetId}/texts/${textId}`)
    .then(response => response)
    .catch(err => dispatch(textFail(err.response.data.errors)));
};
