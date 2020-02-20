import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import axios from '../../services/axios/axios-user';
import * as actionTypes from './actionTypes';
import { defineRulesFor, ability } from '../../services/casl/ability';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (userId, username, roles, rules) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId,
    username,
    roles,
    rules
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
  cookies.remove('expirationDate', { path: '/' });
};

export const setCookie = (token, expirationDate) => {
  const cookies = new Cookies();

  cookies.set('token', token, { path: '/' });
  cookies.set('expirationDate', new Date().getTime() + expirationDate * 1000, {
    path: '/'
  });
};

export const logout = () => dispatch => {
  const url = '/oauth/revoke';
  const cookies = new Cookies();
  const token = cookies.get('token');

  const tokenData = {
    token,
    client_id:
      process.env.NODE_ENV !== 'production'
        ? process.env.CLIENT_ID
        : process.env.PRODUCTION_CLIENT_ID,
    client_secret:
      process.env.NODE_ENV !== 'production'
        ? process.env.CLIENT_SECRET
        : process.env.PRODUCTION_CLIENT_SECRET
  };

  if (token) {
    return axios
      .post(url, tokenData)
      .then(response => {
        removeCookie();
        ability.update([]);
        dispatch(authLogout());

        return response;
      })
      .catch(err => console.log(err));
  }

  dispatch(authLogout());
};

export const auth = (username, password) => (dispatch, getState) => {
  dispatch(authStart());

  const authData = {
    username,
    password,
    grant_type: 'password',
    client_id:
      process.env.NODE_ENV !== 'production'
        ? process.env.CLIENT_ID
        : process.env.PRODUCTION_CLIENT_ID,
    client_secret:
      process.env.NODE_ENV !== 'production'
        ? process.env.CLIENT_SECRET
        : process.env.PRODUCTION_CLIENT_SECRET
  };

  const url = `/oauth/token`;

  return axios
    .post(url, authData)
    .then(response => {
      const token = response.data.access_token;
      const data = jwtDecode(token);

      setCookie(token, response.data.expires_in);
      defineRulesFor(data.user);

      dispatch(
        authSuccess(
          data.user.id,
          data.user.username,
          data.user.roles,
          data.user.rules
        )
      );
    })
    .catch(err => {
      console.log('[Auth Failure]', err);
      dispatch(authFail(err.response.data.errors));
    });
};

export const authCheckState = () => dispatch => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  if (!token) {
    dispatch(logout());
  } else {
    const data = jwtDecode(token);
    const expirationDate = cookies.get('expirationDate');

    if (expirationDate < new Date().getTime()) {
      dispatch(logout());
    } else {
      defineRulesFor(data.user);

      dispatch(
        authSuccess(
          data.user.userId,
          data.user.username,
          data.user.roles,
          data.user.rules
        )
      );
    }
  }
};
