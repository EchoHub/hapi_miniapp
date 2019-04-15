import handlers from "./handlers"
Page({
    data: {
        show: "",
        list: [
            {
                title: "基础组件",
                items: [
                    {
                        label: "Button 按钮",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Cell 单元格",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Icon 图标",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Popup 弹出层",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Transition 动画",
                        value: "",
                        description: "",
                        arrow: true
                    }
                ]
            },
            // {
            //     title: "表单组件",
            //     items: []
            // },
            {
                title: "反馈组件",
                items: [
                    {
                        label: "ActionSheet 上拉菜单",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Dialog 弹出框",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Notify 消息通知",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "SwipeCell 滑动单元格",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    // {
                    //     label: "Toast 轻提示",
                    //     value: "",
                    //     description: "",
                    //     arrow: true
                    // }
                ]
            },
            {
                title: "展示组件",
                items: [
                    {
                        label: "Collapse 折叠面板",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "NoticeBar 通告栏",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Panel 面板",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Steps 步骤条",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "Tag 标记",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    {
                        label: "TreeSelect 分类选择",
                        value: "",
                        description: "",
                        arrow: true
                    }
                ]
            },
            {
                title: "导航组件",
                items: [
                    {
                        label: "Badge 徽章",
                        value: "",
                        description: "",
                        arrow: true
                    },
                    // {
                    //     label: "NavBar 导航栏",
                    //     value: "",
                    //     description: "",
                    //     arrow: true
                    // },
                    {
                        label: "Tab 标签页",
                        value: "",
                        description: "",
                        arrow: true,
                        href: "/pages/home/tabPage/index"
                    },
                    // {
                    //     label: "Tabbar 标签栏",
                    //     value: "",
                    //     description: "",
                    //     arrow: true
                    // }
                ]
            },
            {
                title: "业务组件",
                items: [
                    {
                        label: "MerchantCard 商家卡片",
                        value: "",
                        description: "",
                        arrow: true,
                        href: "/pages/merchantCard/index"
                    }
                ]
            }
        ]
    },
    onLoad(query) {
    },
    onShow() {
    },
    onReady() {
        this.setData({
            show: "active"
        })
    },
    onHide() {
    },
    onUnload() {
    },
    onTitleClick() {
    },
    onPullDownRefresh() {
    },
    onReachBottom() {
    },
    onShareAppMessage() {
    },
    ...handlers
})
