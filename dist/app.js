"use strict";

var _constants = _interopRequireDefault(require("./components/_constants"));

var _utils = _interopRequireDefault(require("./components/utils/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customEvent = new _utils.default.EventTarget();
App({
  /**
   * APP全局常量挂载
   */
  CONSTANTS: _objectSpread({}, _constants.default),

  /**
   * 自定义事件，（状态管理、事件通知）
   */
  $event: customEvent,
  onLaunch: function onLaunch(options) {
    console.log("app launch");
  },
  onShow: function onShow(options) {
    console.log("app show");
  },
  onHide: function onHide() {
    console.log("app hide");
  },
  onError: function onError(err) {
    console.log("app error");
  },
  onShareAppMessage: function onShareAppMessage() {
    console.log("app onShareAppMessage");
  },
  globalData: {
    foo: true
  }
});