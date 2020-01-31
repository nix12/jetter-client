import axios from '../../services/axios/axios-forum';

export const createJet = (name, description) => dispatch => {
  const jetData = {
    name,
    description
  };

  return axios
    .post('/api/jets', jetData)
    .then(response => response)
    .catch(err => console.log(err.response.data.error));
};

export const updateJet = description => {};
