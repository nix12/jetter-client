import axios from '../../services/axios/axios-forum';

export const createLink = (title, uri, jetId) => dispatch => {
  const linkData = {
    title,
    uri,
    jet_id: jetId
  };

  return axios
    .post(`/api/jets/${jetId}/links`, linkData)
    .then(response => response)
    .catch(err => console.log(err.response.data.error));
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
    .catch(err => console.log(err.response.data.error));
};

export const deletePost = linkId => dispatch => {};
