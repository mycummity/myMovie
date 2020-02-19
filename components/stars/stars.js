// components/stars/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rate: {
      type: Number,
      value: 0,
      observer(newVal, oldVal, changedPath) {
        this.updataRate();
      }
    },
    startsize: {
      type: Number,
      value: 20
    },
    fontsize: {
      type: Number,
      value: 20
    },
    fontcolor: {
      type: String,
      value: "#ccc"
    },
    istext: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updataRate() {
      var that = this;
      var rate = that.properties.rate;
      var intrate = parseInt(rate);
      var light = parseInt(intrate / 2);
      var half = intrate % 2;
      var gray = 5 - light - half;
      // 精灵图
      // var pos = (10 - intrate)*35;
      var lights = [];
      var halfs = [];
      var grays = [];
      for (var i = 1; i <= light; i++) {
        lights.push(i);
      }
      for (var i = 1; i <= half; i++) {
        halfs.push(i);
      }
      for (var i = 1; i <= gray; i++) {
        grays.push(i);
      }
      var ratetext = rate && rate > 0 ? rate.toFixed(1) : "未评分";
      that.setData({
        lights: lights,
        halfs: halfs,
        grays: grays,
        ratetext: ratetext
      })
    }
  },
  lifetimes: {
    attached() {
      this.updataRate();
    }
  }
})
