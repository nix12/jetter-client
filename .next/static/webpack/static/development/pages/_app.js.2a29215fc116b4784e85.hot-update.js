webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./store/actions/auth.js":
/*!*******************************!*\
  !*** ./store/actions/auth.js ***!
  \*******************************/
/*! exports provided: authStart, authSuccess, authFail, authLogout, removeCookie, setCookie, logout, auth, authCheckState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authStart", function() { return authStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authSuccess", function() { return authSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authFail", function() { return authFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authLogout", function() { return authLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCookie", function() { return removeCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authCheckState", function() { return authCheckState; });
/* harmony import */ var universal_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! universal-cookie */ "./node_modules/universal-cookie/es6/index.js");
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./store/actions/actionTypes.js");
/* harmony import */ var _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/axios/axios-user */ "./services/axios/axios-user.js");
/* harmony import */ var _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/casl/ability */ "./services/casl/ability.js");




var authStart = function authStart() {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_START"]
  };
};
var authSuccess = function authSuccess(userId, username) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_SUCCESS"],
    userId: userId,
    username: username
  };
};
var authFail = function authFail(error) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_FAIL"],
    error: error
  };
};
var authLogout = function authLogout() {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_LOGOUT"]
  };
};
var removeCookie = function removeCookie() {
  var cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_0__["default"]();
  cookies.remove('token', {
    path: '/'
  });
  cookies.remove('userId', {
    path: '/'
  });
  cookies.remove('username', {
    path: '/'
  });
  cookies.remove('expirationDate', {
    path: '/'
  });
  cookies.remove('rules', {
    path: '/'
  });
};
var setCookie = function setCookie(token, userId, username, expirationDate, rules) {
  var cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_0__["default"]();
  cookies.set('token', token, {
    path: '/'
  });
  cookies.set('userId', userId, {
    path: '/'
  });
  cookies.set('username', username, {
    path: '/'
  });
  cookies.set('expirationDate', new Date().getTime() + expirationDate * 1000, {
    path: '/'
  });
  cookies.set('rules', rules, {
    path: '/'
  });
};
var logout = function logout() {
  return function (dispatch) {
    var url = '/oauth/revoke';
    var cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_0__["default"]();
    var token = cookies.get('token');
    var tokenData = {
      token: token
    };

    if (token) {
      _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].post(url, tokenData).then(function (response) {
        return console.log(response);
      }).catch(function (err) {
        return console.log(err);
      });
    }

    removeCookie();
    _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__["default"].update([]);
    dispatch(authLogout());
  };
};
var auth = function auth(username, password) {
  return function (dispatch) {
    dispatch(authStart());
    var authData = {
      username: username,
      password: password,
      grant_type: 'password',
      client_id: "MQKlxcmBtKpcwYBNbrZA-8kededClB2x7UFQeZ-8HUU",
      client_secret: "LySP9Cpxh77_4L03Yt6UodybwiuTQaWZpLHYITm5KF4"
    };
    var url = '/oauth/token';
    _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].post(url, authData).then(function (response) {
      setCookie(response.data.access_token, response.data.user.userId, response.data.user.username, response.data.expires_in, response.data.user.rules);
      _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__["default"].update(response.data.user.rules);
      dispatch(authSuccess(response.data.user.userId, response.data.user.username));
    }).catch(function (err) {
      dispatch(authFail(err.response.data.errors));
    });
  };
};
var authCheckState = function authCheckState() {
  return function (dispatch) {
    var cookies = new universal_cookie__WEBPACK_IMPORTED_MODULE_0__["default"]();
    var token = cookies.get('token');

    if (!token) {
      dispatch(logout());
    } else {
      var expirationDate = cookies.get('expirationDate');

      if (expirationDate <= new Date().getTime()) {
        dispatch(logout());
      } else {
        var userId = cookies.get('userId');
        var username = cookies.get('username');
        _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__["default"].update(cookies.get('rules'));
        dispatch(authSuccess(userId, username));
      }
    }
  };
};

/***/ })

})
//# sourceMappingURL=_app.js.2a29215fc116b4784e85.hot-update.js.map