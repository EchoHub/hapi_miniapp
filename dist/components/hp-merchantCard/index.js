import Utils from "./../utils/utils";
Component({
  mixins: [],
  data: {
    prefixCls: "hp-merchantcard"
  },
  props: {
    href: "",
    title: "",
    tip: "",
    descrption: "",
    mile: "",
    control: false
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

  didUpdate(prevProps, prevData) {},

  didUnmount() {},

  methods: {}
});