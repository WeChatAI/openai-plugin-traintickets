var data = require("../../api/data.js");

Component({
  properties: {
    // guideType: String
  },
  data: {
    guideIndex: -1,
    guideList: data.getData().guideList,
    noContinuousClick: false //禁止连续点击
  },

  lifetimes: {
    ready: function() {
      this.setData({
        // 更新属性和数据的方法\更新页面数据的方法
      });
    }
  },
  methods: {
    //事件响应函数
    chooseGuide: function(e) {
      if (!this.data.noContinuousClick) {
        this.setData(
          {
            noContinuousClick: true,
            guideIndex: e.currentTarget.dataset.id
          },
          () => {
            var that = this;
            setTimeout(function() {
              that.setData({
                guideIndex: -1
              });
            }, 100);
            setTimeout(function() {
              that.setData({
                noContinuousClick: false
              });
            }, 2000);
          }
        );
        this.triggerEvent("chooseGuide", e.currentTarget.dataset.content);
      }
    }
  }
});
