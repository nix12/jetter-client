import axios from '../../services/axios/axios-user';
import Cookies from 'universal-cookie';
import * as actionTypes from './actionTypes';
import ability from '../../services/casl/ability';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (userId, username) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    username
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const removeCookie = () => {
  const cookies = new Cookies();

  cookies.remove('token', { path: '/' });
  cookies.remove('userId', { path: '/' });
  cookies.remove('username', { path: '/' });
  cookies.remove('expirationDate', { path: '/' });
  cookies.remove('rules', { path: '/' });
};

export const setCookie = (token, userId, username, expirationDate, rules) => {
  const cookies = new Cookies();

  cookies.set('token', token, { path: '/' });
  cookies.set('userId', userId, { path: '/' });
  cookies.set('username', username, { path: '/' });
  cookies.set('expirationDate', new Date().getTime() + expirationDate * 1000, {
    path: '/'
  });
  cookies.set('rules', rules, { path: '/' });
};

export const logout = () => dispatch => {
  const url = '/oauth/revoke';
  const cookies = new Cookies();
  const token = cookies.get('token');

  const tokenData = {
    token
  }
  if (token) {
    axios.post(url, tokenData).catch(err => console.log(err));
  }

  removeCookie();
  ability.update([]);
  dispatch(authLogout());
};

export const auth = (username, password) => dispatch => {
  dispatch(authStart());

  const authData = {
    username,
    password,
    grant_type: 'password',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  };

  const url = '/oauth/token';

  axios
    .post(url, authData)
    .then(response => {
      setCookie(
        response.data.access_token,
        response.data.user.userId,
        response.data.user.username,
        response.data.expires_in,
        response.data.user.rules
      );

      ability.update(response.data.user.rules);

      dispatch(
        authSuccess(response.data.user.userId, response.data.user.username)
      );
    })
    .catch(err => {
      dispatch(authFail(err.response.data.errors));
    });
};

export const authCheckState = () => dispatch => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = cookies.get('expirationDate');

    if (expirationDate <= new Date().getTime()) {
      dispatch(logout());
    } else {
      const userId = cookies.get('userId');
      const username = cookies.get('username');
      ability.update(cookies.get('rules'));

      dispatch(authSuccess(userId, username));
    }
  }
};
