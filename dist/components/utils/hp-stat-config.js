"use strict";

exports.serverUrl = 'https://mapp.shulidata.com';
exports.server = 'http://'; // 小程序接口地址

exports.source = 'XXXX'; // 小程序来源

exports.platform = 'ALIPAY'; // 平台标识

exports.app_key = 'app_key_xxxxxxxxxxxx'; // 请在此行填写从数立后台获取的appkey

exports.app_id = 'appid_xxxxxxxxxxxx'; // 统计分享到群、二维码扫码数据时需填写，不填写无法统计

exports.appsecret = ''; // 统计分享到群、二维码扫码数据时需填写，不填写无法统计

exports.getLocation = false; // 默认不获取用户坐标位置

exports.getAuth = false; // 默认不授权
// 默认上报特征

exports.defaultTrackConfig = ['datetime' // 唤起时间
];