import axios from '../../services/axios/axios-forum';
import * as actionTypes from './actionTypes';

export const jetFail = error => {
  return {
    type: actionTypes.JET_FAIL,
    error
  };
};

export const createJet = (name, description) => dispatch => {
  const jetData = {
    name,
    description
  };

  return axios
    .post('/api/jets', jetData)
    .then(response => response)
    .catch(err => {
      const errorData = [];
      const error = {};

      Object.entries(err.response.data.errors).forEach(([key, value]) => {
        /* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */

        error[key] = value;
        errorData.push(error);
        // Object.values(value).map(v => {
        //   error[key] = v;
        //   console.log(error);
        //   errorData.push([error]);
        // });
        // console.log(errorData);
      });

      dispatch(jetFail(errorData[0]));
    });
};

export const updateJet = description => {};
