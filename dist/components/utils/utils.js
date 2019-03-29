"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _type = _interopRequireDefault(require("./type"));

var _event = _interopRequireDefault(require("./event"));

var _My = _interopRequireWildcard(require("./_my"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function classNames(cn1, cn2) {
  if (!cn2 || !cn1) return cn1 || cn2;
  return cn1.concat(" " + cn2.replace(new RegExp(cn1, "g"), "")).replace(/\s+/g, " ");
}

;
var _default = {
  Type: _type.default,
  EventTarget: _event.default,
  _My: _My,
  classNames: classNames
};
exports.default = _default;