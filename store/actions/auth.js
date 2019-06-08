import * as actionTypes from './actionTypes';
import axios from '../../services/axios/axios-user';
import ability from '../../services/casl/ability';
import Cookies from 'universal-cookie';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    username: username,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const logout = () => dispatch => new Promise((resolve, reject) => { 
  const url = '/oauth/revoke';
  const cookies = new Cookies();
  
  resolve(
    axios.post(url)
      .then(response => {
        cookies.remove('token', { path: '/' })
        cookies.remove('username', { path: '/' });
        cookies.remove('userId', { path: '/' });
        cookies.remove('expirationDate', { path: '/' });
        cookies.remove('rules', { path: '/' });
        ability.update([]);
        
        dispatch(authLogout());
      })
  );
});

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }

    const url = '/oauth/token';
    const cookies = new Cookies();

    axios.post(url, authData)
      .then(response => {
        cookies.set('token', response.data.access_token, { path: '/'});
        cookies.set('username', response.data.user.username, { path: '/' });
        cookies.set('userId', response.data.user.userId, { path: '/' });
        cookies.set('expirationDate', response.data.created_at, { path: '/' });
        cookies.set('rules', response.data.user.rules, { path: '/' });
        ability.update(response.data.user.rules);

        dispatch(authSuccess(
          response.data.user.userId, 
          response.data.user.username, 
        ));
      })
      .catch(err => {
        console.log(err.response)
        dispatch(authFail(err.response.data.errors));
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const cookies = new Cookies();
    const token = cookies.get('token');

    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(cookies.get('expirationDate') * 1000);

      if (expirationDate <= new Date(Date.UTC(0))) {
        dispatch(logout());
      } else {
        const userId = cookies.get('userId');
        const username = cookies.get('username');
        ability.update(cookies.get('rules'));

        dispatch(authSuccess(userId, username));
      }
    }
  }
}
