// 导航栏
// 保留当前页面，跳转到应用内的某个指定页面，可以使用 my.navigateBack 返回到原来页面。
/**
 * @desc 当前页面正跳转
 *  */
export function navigateTo(url, success, fail, complete) {
  my.navigateTo({
    url,
    success,
    fail,
    complete
  })
}
/**
 * @desc 设置导航栏文字及样式
 */
export function setNavigationBar(options) {
  my.setNavigationBar(options)
}

/**
 * @desc 获取系统信息
 */
export function getSystemInfo(success, fail, complete) {
  my.getSystemInfo({
    success,
    fail,
    complete
  })
}

/**
 * @desc 显示导航栏 loading
 */
export function showNavigationBarLoading() {
  my.showNavigationBarLoading()
}
/**
 * @desc 隐藏导航栏 loading
 */
export function hideNavigationBarLoading() {
  my.hideNavigationBarLoading()
}
// 用户授权
export function getAuthCode(scopes, success, fail, complete) {
  my.getAuthCode({
    scopes,
    success,
    fail,
    complete
  })
}
// 获取会员信息
export function getAuthUserInfo(success, fail, complete) {
  my.getAuthUserInfo({
    success,
    fail,
    success
  })
}
/**
 * @desc 吐司
 * @param others 
 *    - type toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none’。其中 exception 类型必须传文字信息
 *    - duration 显示时长，单位为 ms，默认 2000
 *  */
export function showToast(content, success, fail, complete, others) {
  my.showToast({
    content,
    success,
    fail,
    complete,
    others
  })
}


// 根据选择器查找指定标签
export function find(selector) {
  const query = my.createSelectorQuery();
  return new Selector(query.select(selector));
}
function Selector(selector) {
  this.selector = selector
}
Selector.prototype = {
  boundingClientRect: function(callback) {
    return this.selector.boundingClientRect().exec(callback)
  }
}

// 动画
export function animation(options) {
  return my.createAnimation(options);
}