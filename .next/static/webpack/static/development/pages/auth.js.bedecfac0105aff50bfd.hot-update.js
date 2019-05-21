webpackHotUpdate("static/development/pages/auth.js",{

/***/ "./store/actions/index.js":
/*!********************************!*\
  !*** ./store/actions/index.js ***!
  \********************************/
/*! exports provided: auth, logout, register, show, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth */ "./store/actions/auth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "auth", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["auth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return _auth__WEBPACK_IMPORTED_MODULE_0__["logout"]; });

/* harmony import */ var _register__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register */ "./store/actions/register.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _register__WEBPACK_IMPORTED_MODULE_1__["register"]; });

/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user */ "./store/actions/user.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "show", function() { return _user__WEBPACK_IMPORTED_MODULE_2__["show"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _user__WEBPACK_IMPORTED_MODULE_2__["update"]; });





/***/ }),

/***/ "./store/actions/user.js":
/*!*******************************!*\
  !*** ./store/actions/user.js ***!
  \*******************************/
/*! exports provided: update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actionTypes */ "./store/actions/actionTypes.js");
/* harmony import */ var _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/axios/axios-user */ "./services/axios/axios-user.js");



var update = function update(username, current_password, password, password_confirmation) {
  return function (dispatch) {
    return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a(function (resolve, reject) {
      var url = "/api/users/";
      var userData = {
        user: {
          current_password: current_password,
          password: password,
          password_confirmation: password_confirmation
        }
      };
      resolve(_services_axios_axios_user__WEBPACK_IMPORTED_MODULE_2__["default"].put(url, userData).then(function (response) {
        console.log('update response', response);
      }).catch(function (err) {
        console.log('update error', err.response);
      }));
    });
  };
};

/***/ })

})
//# sourceMappingURL=auth.js.bedecfac0105aff50bfd.hot-update.js.map