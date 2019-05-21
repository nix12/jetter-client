import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';

export const update = (username, current_password, password, password_confirmation) => dispatch => new Promise((resolve, reject) => {
  const url = `/api/users/`
  const userData = {
    user: {
      current_password: current_password,
      password: password,
      password_confirmation: password_confirmation,
    } 
  }

  resolve(
    axios.put(url, userData)
      .then(response => {
        console.log('update response', response);
      })
      .catch(err => {
        console.log('update error', err.response)
      })
  )
})