import handlers from "./handlers"
Page({
    data: {
        tabs: [
            {
                label: "标签一"
                // badgeType: 'text',
                // badgeText: '6', 
            },
            {
                label: "标签二"
            }
        ],
        tabs2: [
            {
                label: "标签一"
            },
            {
                label: "标签二"
            },
            {
                label: "标签三"
            }
        ],
        tabs3: [
            {
                label: "标签一",
                // badgeType: 'text',
                // badgeText: '6', 
            },
            {
                label: "标签二"
            },
            {
                label: "标签三"
            },
            {
                label: "标签四"
            },
            {
                label: "标签五"
            },
            {
                label: "标签六"
            },
            {
                label: "标签七"
            },
            {
                label: "标签八"
            }
        ],
        tabs4: [
            {
                label: "标签一",
                badgeType: "image",
                badges: [
                    "./../../../assets/static/tabs/2_default.png",
                    "./../../../assets/static/tabs/2.png"
                ]
            },
            {
                label: "标签二",
                badgeType: "image",
                badges: [
                    "./../../../assets/static/tabs/2_default.png",
                    "./../../../assets/static/tabs/2.png"
                ]
            },
        ],
        tabs5: [
            {
                label: "标签一",
                badgeType: "image",
                badges: [
                    "./../../../assets/static/tabs/2_default.png",
                    "./../../../assets/static/tabs/2.png"
                ],
                tabBarActiveTextColor: "#FB541C"
            },
            {
                label: "标签二",
                badgeType: "image",
                badges: [
                    "./../../../assets/static/tabs/1_default.png",
                    "./../../../assets/static/tabs/1.png"
                ],
                tabBarActiveTextColor: "#5677FC"
            }
        ],
        activeTab: 0,
        activeTab2: 0,
        activeTab3: 4,
        activeTab4: 0,
        activeTab5: 0,
    },
    onLoad(query) {},
    onShow() {
    },
    onReady() {
    },
    onHide() {},
    onUnload() {
    },
    onTitleClick() {},
    onPullDownRefresh() {
    },
    onReachBottom() {
    },
    onShareAppMessage() {
    },
    ...handlers
})
