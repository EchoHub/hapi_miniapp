import Utils from "./../utils/utils"
Component({
    mixins: [],
    data: {
        prefixCls: "hp-cell"
    },
    props: {
        className: "",
        label: "", // 标签名
        value: "", // 标签值
        description: "", // 内容
        icon: false, // 是否有图标
        tag: "", // 是否有标签
        arrow: false, // 是否有箭头
    },

    didMount() {
        const { className } = this.props;
        const { prefixCls } = this.data;
        this.setData({
            className: Utils.classNames(prefixCls, className)
        })
    },

    didUpdate(prevProps, prevData) {
    },

    didUnmount() { },

    methods: {}
});