"use strict";

var _global = {
  uid: null,
  sessionId: null
};

function hp() {
  var config = require("./hp-stat-config"); // 创建当前会话的sessionId


  _global.sessionId = +new Date() + ch(16);

  function ca() {
    return new Promise(function (resolve, reject) {
      try {
        my.getAuthCode({
          scopes: 'auth_base',
          success: function success(res) {
            ;
            (my.httpRequest || my.request)({
              url: config.server + '/auth/token',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: {
                authCode: res.authCode,
                platform: config.platform,
                source: config.source
              },
              success: function success(resp) {
                var respData = resp.data || {};
                var data = respData.data || {};
                sv('用户信息', {
                  level: 3,
                  eventId: 'userInfo',
                  extParams: {
                    userInfo: JSON.stringify(data.user)
                  }
                });
              },
              fail: function fail() {}
            });
            resolve();
          },
          fail: function fail() {}
        });
      } catch (e) {
        console.log('用户鉴权：', e);
      }
    });
  }

  function sv(lg, ob) {
    var p = Object.assign(ob, {
      eventName: lg,
      appId: config.app_id,
      appKey: config.app_key,
      sessionId: _global.sessionId,
      datetime: +new Date()
    });

    try {
      ;
      (my.httpRequest || my.request)({
        url: config.serverUrl + '/track/receive',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: p,
        success: function success() {},
        fail: function fail() {}
      });
    } catch (e) {
      sv('错误信息', {
        level: 4,
        eventId: 'error',
        extParams: {
          errorInfo: JSON.stringify(p)
        }
      });
    }
  }

  function h(behavors, level) {
    var _this = this;

    if (!behavors) return;

    try {
      var _loop = function _loop() {
        var behavor = behavors[i];
        var _behavor = _this[behavor];

        if (_behavor) {
          _this[behavor] = function (options) {
            if (!(config.defaultTrackConfig instanceof Array)) {
              console.log('哈皮统计提示：默认上报特征必须为数组形式配置');
              return;
            }

            var defaultTrackConfig = config.defaultTrackConfig.length ? config.defaultTrackConfig : ['datetime'];

            for (var j = 0; j < defaultTrackConfig.length; j++) {
              if (level === 1 && behavor.toUpperCase() === 'ONLAUNCH') {
                ca();
                my.getSystemInfo({
                  success: function success(data) {
                    sv('获取系统信息', {
                      level: level,
                      eventId: 'systemInfo',
                      extParams: {
                        systemInfo: JSON.stringify(data)
                      }
                    });
                  }
                });
              } // 获取Page页面URL


              if (level === 2 || level === 1) {
                var pageList = getCurrentPages && getCurrentPages() || [];
                var currentPage = pageList[pageList.length - 1] || {};
                var url = currentPage.route || '';
              }

              sv('', {
                level: level,
                eventId: behavor,
                url: url
              });
            }

            return _behavor.call(this, options || null);
          };
        }
      };

      for (var i = 0; i < behavors.length; i++) {
        _loop();
      }
    } catch (e) {
      console.log('App Page上报：', e);
    }
  }

  function ch(hashLength) {
    if (!hashLength || typeof Number(hashLength) != 'number') {
      return;
    }

    var ar = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var hs = [];
    var hl = Number(hashLength);
    var al = ar.length;

    for (var i = 0; i < hl; i++) {
      hs.push(ar[Math.floor(Math.random() * al)]);
    }

    return hs.join('');
  }

  return {
    $App: function $App(conf) {
      var cycles = ['onLaunch', 'onShow', 'onHide', 'onError', 'onShareAppMessage'];
      h.call(conf, cycles, 1);
      return conf;
    },
    $Page: function $Page(conf) {
      var cycles = ['onLoad', 'onShow', 'onReady', 'onHide', 'onShareAppMessage'];
      h.call(conf, cycles, 2);
      return conf;
    },
    sendEvent: function sendEvent(desc, extp) {
      return sv(desc, extp);
    }
  };
}

module.exports = hp();