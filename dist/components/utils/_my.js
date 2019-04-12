"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.navigateTo = navigateTo;
exports.setNavigationBar = setNavigationBar;
exports.getSystemInfo = getSystemInfo;
exports.showNavigationBarLoading = showNavigationBarLoading;
exports.hideNavigationBarLoading = hideNavigationBarLoading;
exports.getAuthCode = getAuthCode;
exports.getAuthUserInfo = getAuthUserInfo;
exports.showToast = showToast;
exports.find = find;
exports.animation = animation;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 导航栏
// 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。

/**
 * @desc 当前页面正跳转
 *  */
function navigateTo(url, success, fail, complete) {
  my.navigateTo({
    url: url,
    success: success,
    fail: fail,
    complete: complete
  });
}
/**
 * @desc 设置导航栏文字及样式
 */


function setNavigationBar(options) {
  my.setNavigationBar(options);
}
/**
 * @desc 获取系统信息
 */


function getSystemInfo(success, fail, complete) {
  my.getSystemInfo({
    success: success,
    fail: fail,
    complete: complete
  });
}
/**
 * @desc 显示导航栏 loading
 */


function showNavigationBarLoading() {
  my.showNavigationBarLoading();
}
/**
 * @desc 隐藏导航栏 loading
 */


function hideNavigationBarLoading() {
  my.hideNavigationBarLoading();
} // 用户授权


function getAuthCode(scopes, success, fail, complete) {
  my.getAuthCode({
    scopes: scopes,
    success: success,
    fail: fail,
    complete: complete
  });
} // 获取会员信息


function getAuthUserInfo(success, fail, complete) {
  my.getAuthUserInfo(_defineProperty({
    success: success,
    fail: fail
  }, "success", success));
}
/**
 * @desc 吐司
 * @param others 
 *    - type toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none’。其中 exception 类型必须传文字信息
 *    - duration 显示时长，单位为 ms，默认 2000
 *  */


function showToast(content, success, fail, complete, others) {
  my.showToast({
    content: content,
    success: success,
    fail: fail,
    complete: complete,
    others: others
  });
} // 根据选择器查找指定标签


function find(selector) {
  var query = my.createSelectorQuery();
  return new Selector(query.select(selector));
}

function Selector(selector) {
  this.selector = selector;
}

Selector.prototype = {
  boundingClientRect: function boundingClientRect(callback) {
    return this.selector.boundingClientRect().exec(callback);
  } // 动画

};

function animation(options) {
  return my.createAnimation(options);
}