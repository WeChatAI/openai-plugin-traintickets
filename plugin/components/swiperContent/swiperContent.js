Component({
  properties: {
    // guideType: String
  },
  data: {
    guideIndex: -1, 
    guideList: ["北京天气怎么样", "上海今天有雨吗", "中午吃啥呢", "你知道如何排解压力吗", "法国国土面积是多少", "世界最高峰"],
    noContinuousClick: false, //禁止连续点击
  },

  lifetimes: {
    ready: function () {
      this.setData({
        // 更新属性和数据的方法\更新页面数据的方法
      })
    },
  },
  methods: {
    //事件响应函数
    chooseGuide: function (e) {
      if (!this.data.noContinuousClick) {
        this.setData({
          noContinuousClick: true,
          guideIndex: e.currentTarget.dataset.id
        }, () => {
          var that = this
          setTimeout(function () {
            that.setData({
              guideIndex: -1
            })
          }, 100)
          setTimeout(function () {
            that.setData({
              noContinuousClick: false
            })
          }, 2000)
        })
        this.triggerEvent('chooseGuide', e.currentTarget.dataset.content)
      }
    }
  }
})