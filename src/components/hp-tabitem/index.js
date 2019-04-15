import Utils from "./../utils/utils"
import { classNames } from "./../utils/format"
Component({
    mixins: [],
    data: { },
    props: {
        prefixCls: "hp-tabitem",
        index: 0,
        activeTab: 0,
        className: ""
    },

    didMount() {
        this.checkTabItemActive()
    },
    
    didUpdate(prevProps, prevData) {
        this.checkTabItemActive()
    },

    didUnmount() { },

    methods: {
        checkTabItemActive() {
            const { prefixCls, className, isActive, index } = this.props;
            this.setData({
                className: classNames(prefixCls, className, {
                    [`hp-tabitem_active`]: isActive
                })
            })
        }
    }
});