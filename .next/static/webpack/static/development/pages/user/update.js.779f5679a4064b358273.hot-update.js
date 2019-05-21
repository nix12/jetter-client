webpackHotUpdate("static/development/pages/user/update.js",{

/***/ "./store/actions/user.js":
/*!*******************************!*\
  !*** ./store/actions/user.js ***!
  \*******************************/
/*! exports provided: userShow, show, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userShow", function() { return userShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "show", function() { return show; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./store/actions/actionTypes.js");
/* harmony import */ var _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/axios/axios-user */ "./services/axios/axios-user.js");



var userShow = function userShow(username) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_1__["USER_SHOW"],
    username: username
  };
};
var show = function show(username) {
  return function (dispatch) {
    return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
      var url = "/api/users/".concat(username);
      resolve(_services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].get(url).then(function (response) {
        console.log('show user', response); // return response.data

        dispatch(userShow(response.data.username));
      }));
    });
  };
};
var update = function update(userId, password, password_confirmation) {
  return function (dispatch) {
    return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
      var url = "/api/users/".concat(userId);
      var userData = {
        user: {
          password: password,
          password_confirmation: password_confirmation
        }
      };
      resolve(_services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].put(url, userData).then(function (response) {
        console.log('update response', response);
      }).catch(function (err) {
        console.log('update error', err);
      }));
    });
  };
};

/***/ })

})
//# sourceMappingURL=update.js.779f5679a4064b358273.hot-update.js.map