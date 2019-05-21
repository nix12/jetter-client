webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./store/reducers/auth.js":
/*!********************************!*\
  !*** ./store/reducers/auth.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/actionTypes */ "./store/actions/actionTypes.js");
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/utility */ "./shared/utility.js");



var initialState = {
  currentUser: {
    isLoggedIn: false,
    userId: null,
    username: null,
    loading: false,
    error: null
  }
};

var authStart = function authStart(state, action) {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_2__["updateObject"])(state, {
    error: null,
    loading: true
  });
};

var authSuccess = function authSuccess(state, action) {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_2__["updateObject"])(state, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
    currentUser: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state.currentUser, {
      isLoggedIn: true,
      userId: action.userId,
      username: action.username,
      error: null,
      loading: false
    })
  }));
};

var authFail = function authFail(state, action) {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_2__["updateObject"])(state, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
    currentUser: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state.currentUser, {
      error: action.error,
      loading: false
    })
  }));
};

var authLogout = function authLogout(state, action) {
  return Object(_shared_utility__WEBPACK_IMPORTED_MODULE_2__["updateObject"])(state, {
    isLoggedIn: false,
    userId: null,
    username: null
  });
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_START"]:
      return authStart(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_SUCCESS"]:
      return authSuccess(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_FAIL"]:
      return authFail(state, action);

    case _actions_actionTypes__WEBPACK_IMPORTED_MODULE_1__["AUTH_LOGOUT"]:
      return authLogout(state, action);

    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

})
//# sourceMappingURL=_app.js.099359bc85ea009015e1.hot-update.js.map