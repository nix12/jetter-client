webpackHotUpdate("static/development/pages/user/update.js",{

/***/ "./pages/user/update.jsx":
/*!*******************************!*\
  !*** ./pages/user/update.jsx ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/router */ "./node_modules/next/dist/client/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _services_axios_axios_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../services/axios/axios-user */ "./services/axios/axios-user.js");
/* harmony import */ var _components_UI_Input_Input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../components/UI/Input/Input */ "./components/UI/Input/Input.jsx");
/* harmony import */ var _components_UI_Button_Button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/UI/Button/Button */ "./components/UI/Button/Button.jsx");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @material-ui/core/CircularProgress */ "./node_modules/@material-ui/core/CircularProgress/index.js");
/* harmony import */ var _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _shared_utility__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../shared/utility */ "./shared/utility.js");
/* harmony import */ var _store_actions_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../store/actions/index */ "./store/actions/index.js");







var _jsxFileName = "/home/developer/Projects/jetter/client/pages/user/update.jsx";










var Update =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Update, _Component);

  function Update() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Update);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Update)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "state", {
      controls: {
        current_password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Current Password'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'New Password'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          touched: false
        },
        password_confirmation: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: 'Password Confirmation'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      }
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "inputChangedHandler", function (event, controlName) {
      var updatedControls = Object(_shared_utility__WEBPACK_IMPORTED_MODULE_14__["updateObject"])(_this.state.controls, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])({}, controlName, Object(_shared_utility__WEBPACK_IMPORTED_MODULE_14__["updateObject"])(_this.state.controls[controlName], {
        value: event.target.value,
        valid: Object(_shared_utility__WEBPACK_IMPORTED_MODULE_14__["checkValidity"])(event.target.value, _this.state.controls[controlName].validation),
        touched: true
      })));

      _this.setState({
        controls: updatedControls
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "submitHandler", function (event) {
      event.preventDefault();

      _this.props.onUpdate(localStorage.getItem('username'), _this.state.controls.current_password.value, _this.state.controls.password.value, _this.state.controls.password_confirmation.value).then(function () {
        next_router__WEBPACK_IMPORTED_MODULE_9___default.a.push('/index');
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Update, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var formElementsArray = [];

      for (var key in this.state.controls) {
        formElementsArray.push({
          id: key,
          config: this.state.controls[key]
        });
      }

      var form = formElementsArray.map(function (formElement) {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_UI_Input_Input__WEBPACK_IMPORTED_MODULE_11__["default"], {
          key: formElement.id,
          elementType: formElement.config.elementType,
          elementConfig: formElement.config.elementConfig,
          value: formElement.config.value,
          invalid: !formElement.config.valid,
          shouldValidate: formElement.config.validation,
          touched: formElement.config.touched,
          changed: function changed(event) {
            return _this2.inputChangedHandler(event, formElement.id);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 93
          },
          __self: this
        });
      });

      if (this.props.loading) {
        form = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_13___default.a, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 106
          },
          __self: this
        });
      }

      var errorMessage = null;

      if (this.props.error) {
        errorMessage = react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("p", {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 113
          },
          __self: this
        }, this.props.error);
      }

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 118
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        },
        __self: this
      }, "Update Password"), errorMessage, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("form", {
        onSubmit: this.submitHandler,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }, form, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_UI_Button_Button__WEBPACK_IMPORTED_MODULE_12__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 124
        },
        __self: this
      }, "Submit")));
    }
  }]);

  return Update;
}(react__WEBPACK_IMPORTED_MODULE_7__["Component"]);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    onUpdate: function onUpdate(username, current_password, password, password_confirmation) {
      return dispatch(_store_actions_index__WEBPACK_IMPORTED_MODULE_15__["update"](username, current_password, password, password_confirmation));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(null, mapDispatchToProps)(Update));

/***/ })

})
//# sourceMappingURL=update.js.ac204b5f4b609992952e.hot-update.js.map