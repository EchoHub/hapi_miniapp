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
                badges: []
                // badgeType: 'text',
                // badgeText: '6', 
            },
            {
                label: "标签二",
                badgeType: "image",
                badges: []
            }
        ],
        activeTab: 1,
        activeTab2: 0,
        activeTab3: 5,
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
