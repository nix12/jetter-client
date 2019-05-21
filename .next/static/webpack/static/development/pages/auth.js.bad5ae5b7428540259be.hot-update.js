webpackHotUpdate("static/development/pages/auth.js",{

/***/ "./store/actions/auth.js":
/*!*******************************!*\
  !*** ./store/actions/auth.js ***!
  \*******************************/
/*! exports provided: authStart, authSuccess, authFail, authLogout, logout, auth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authStart", function() { return authStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authSuccess", function() { return authSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authFail", function() { return authFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authLogout", function() { return authLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return auth; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
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
var logout = function logout() {
  return function (dispatch) {
    return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
      var url = '/oauth/revoke';
      resolve(_services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].post(url).then(function (response) {
        sessionStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__["default"].update([]);
        dispatch(authLogout());
      }));
    });
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
      sessionStorage.setItem('token', response.data.access_token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userId', response.data.user.userId);
      _services_casl_ability__WEBPACK_IMPORTED_MODULE_3__["default"].update(response.data.user.rules);
      dispatch(authSuccess(response.data.user.userId, response.data.user.username));
    }).catch(function (err) {
      console.log(err.response);
      dispatch(authFail(err.response.data.errors));
    });
  };
};

/***/ })

})
//# sourceMappingURL=auth.js.bad5ae5b7428540259be.hot-update.js.map