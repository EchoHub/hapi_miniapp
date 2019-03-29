import Utils from "./../utils/utils";
Component({
  mixins: [],
  data: {
    prefixCls: "hp-card"
  },
  props: {
    className: ""
  },

  didMount() {
    const {
      className
    } = this.props;
    const {
      prefixCls
    } = this.data;
    this.setData({
      className: Utils.classNames(prefixCls, className)
    });
  },

  didUpdate(prevProps, prevData) {
    console.log(prevProps, prevData);
  },

  didUnmount() {},

  methods: {}
});