import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-forum';

export const linkFail = error => {
  return {
    type: actionTypes.LINK_FAIL,
    error
  };
};

export const createLink = (title, uri, jetId) => dispatch => {
  const linkData = {
    title,
    uri,
    jet_id: jetId
  };

  return axios
    .post(`/api/jets/${jetId}/links`, linkData)
    .then(response => response)
    .catch(err => dispatch(linkFail(err.response.data.errors)));
};

export const updateLink = (title, uri, jetId, linkId) => dispatch => {
  const linkData = {
    link: {
      title,
      uri,
      jet_id: jetId,
      link_id: linkId
    }
  };

  return axios
    .put(`/api/jets/${jetId}/links/${linkId}`, linkData)
    .then(response => response)
    .catch(err => dispatch(linkFail(err.response.data.errors)));
};

export const deleteLink = (jetId, linkId) => dispatch => {
  return axios
    .delete(`/api/jets/${jetId}/links/${linkId}`)
    .then(response => response)
    .catch(err => dispatch(linkFail(err.response.data.errors)));
};
