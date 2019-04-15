import * as _My from "./../utils/_my";
import { classNames } from "./../utils/format";
Component({
  mixins: [],
  data: {
    scrollable: false,
    containerWidth: 0,
    styleCss: {},
    lineCss: {},
    className: ""
  },
  props: {
    prefixCls: "hp-tab",
    tabs: [],
    activeTab: 0,
    theme: "default",
    // default/primary
    className: ""
  },

  didMount() {
    const {
      prefixCls,
      className,
      theme,
      tabs,
      activeTab
    } = this.props;
    this.setData({
      id: this.$id,
      scrollable: tabs.length > 4,
      className: classNames(prefixCls, className, {
        [`hp-tab-${theme}`]: theme
      })
    });
    const {
      id
    } = this.data;

    _My.find(`#hp-tab__${id}`).boundingClientRect(data => {
      const width = data[0].width;
      this.setData({
        containerWidth: width
      });
      this.calculatePosition(`#hp-tab__${id} .hp-tab__label.active`, width, null, activeTab, tabs.length);
    });
  },

  didUpdate(prevProps, prevData) {
    const {
      activeTab
    } = this.props;
    if (activeTab === prevProps.activeTab) return false;
  },

  didUnmount() {},

  methods: {
    handleTabClick(e) {
      const {
        onTabClick,
        tabs
      } = this.props;
      const {
        containerWidth,
        id
      } = this.data;
      const {
        dataset,
        offsetLeft
      } = e.target;
      const {
        index
      } = dataset;
      this.calculatePosition(`#hp-tab__${id} .hp-tab__label.active`, containerWidth, offsetLeft, index, tabs.length);
      onTabClick instanceof Function && onTabClick(index);
    },

    calculatePosition(selector, containerWidth, oleft, index, len) {
      _My.find(selector).boundingClientRect(data => {
        const {
          width,
          left
        } = data[0];
        const offsetLeft = oleft !== null ? oleft : left - 10;

        const _left = width + offsetLeft;

        const moveLeft = _left - containerWidth;
        this.setData({
          styleCss: {
            transform: index === len - 1 && len > 4 ? `
                        translateX(${-moveLeft}px)` : len >= 4 && moveLeft > 0 ? `translateX(${-(moveLeft + (index < len - 1 ? width / 2 : 0))}px)` : "translateX(0)"
          },
          lineCss: {
            transform: `translateX(${offsetLeft}px)`,
            width: `${width}px`
          }
        });
      });
    }

  }
});