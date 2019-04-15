import * as _My from "utils/_my";
const handlers = {
    handleTabClick(index) {
        _My.showToast(`切换到标签 ${index + 1}`)
        this.setData({
            activeTab: index
        })
    },
    handleTabClick2(index) {
        _My.showToast(`切换到标签 ${index + 1}`)
        this.setData({
            activeTab2: index
        })
    },
    handleTabClick3(index) {
        _My.showToast(`切换到标签 ${index + 1}`)
        this.setData({
            activeTab3: index
        })
    },
    handleTabClick4(index) {
        _My.showToast(`切换到标签 ${index + 1}`)
        this.setData({
            activeTab4: index
        })
    }
}
export default handlers;