webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./store/actions/user.js":
/*!*******************************!*\
  !*** ./store/actions/user.js ***!
  \*******************************/
/*! exports provided: updateStart, updateSuccess, updateFail, update */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateStart", function() { return updateStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSuccess", function() { return updateSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFail", function() { return updateFail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ "./store/actions/actionTypes.js");
/* harmony import */ var _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/axios/axios-user */ "./services/axios/axios-user.js");


var updateStart = function updateStart() {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_START"]
  };
};
var updateSuccess = function updateSuccess() {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_SUCCESS"]
  };
};
var updateFail = function updateFail(error) {
  return {
    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FAIL"],
    error: error
  };
};
var update = function update(username, current_password, password, password_confirmation) {
  return function (dispatch) {
    dispatch(updateStart());
    var url = "/api/users/";
    var userData = {
      user: {
        username: username,
        current_password: current_password,
        password: password,
        password_confirmation: password_confirmation
      }
    };
    _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_1__["default"].put(url, userData).then(function () {
      dispatch(updateSuccess());
    }).catch(function (err) {
      dispatch(updateFail(err.response.data.error));
    });
  };
};

/***/ })

})
//# sourceMappingURL=_app.js.c1f6333debead2dd5b9d.hot-update.js.map