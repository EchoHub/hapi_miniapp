"use strict";

var _handlers = _interopRequireDefault(require("./handlers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Page(_objectSpread({
  data: {
    show: "",
    list: [{
      title: "基础组件",
      items: [{
        label: "Button 按钮",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Cell 单元格",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Icon 图标",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Popup 弹出层",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Transition 动画",
        value: "",
        description: "",
        arrow: true
      }]
    }, // {
    //     title: "表单组件",
    //     items: []
    // },
    {
      title: "反馈组件",
      items: [{
        label: "ActionSheet 上拉菜单",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Dialog 弹出框",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Notify 消息通知",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "SwipeCell 滑动单元格",
        value: "",
        description: "",
        arrow: true
      }]
    }, {
      title: "展示组件",
      items: [{
        label: "Collapse 折叠面板",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "NoticeBar 通告栏",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Panel 面板",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Steps 步骤条",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "Tag 标记",
        value: "",
        description: "",
        arrow: true
      }, {
        label: "TreeSelect 分类选择",
        value: "",
        description: "",
        arrow: true
      }]
    }, {
      title: "导航组件",
      items: [{
        label: "Badge 徽章",
        value: "",
        description: "",
        arrow: true
      }, // {
      //     label: "NavBar 导航栏",
      //     value: "",
      //     description: "",
      //     arrow: true
      // },
      {
        label: "Tab 标签页",
        value: "",
        description: "",
        arrow: true
      }]
    }, {
      title: "业务组件",
      items: [{
        label: "MerchantCard 商家卡片",
        value: "",
        description: "",
        arrow: true,
        href: "/pages/merchantCard/index"
      }]
    }]
  },
  onLoad: function onLoad(query) {},
  onShow: function onShow() {},
  onReady: function onReady() {
    this.setData({
      show: "active"
    });
  },
  onHide: function onHide() {},
  onUnload: function onUnload() {},
  onTitleClick: function onTitleClick() {},
  onPullDownRefresh: function onPullDownRefresh() {},
  onReachBottom: function onReachBottom() {},
  onShareAppMessage: function onShareAppMessage() {}
}, _handlers.default));