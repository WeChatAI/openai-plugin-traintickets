var plugin = requirePlugin("myPlugin");
Page({
  data: {
    list: [{
      text: "对话"
    },
    {
      text: "设置"
    }],
    guideList : [
      '北京天气怎么样',
      "上海今天有雨吗",
      "中午吃啥呢",
      "你知道如何排解压力吗",
      "法国国土面积是多少",
      "世界最高峰"
    ]
  },
  onLoad: function() {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    
  },
  onShareAppMessage: function () {
    console.log('onShareAppMessage')
  },
  bindtapOpenHaveUI: function(e) {
    plugin.setGuideList(this.data.guideList)
    wx.navigateTo({
      url: "../pluginChat/pluginChat",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  },
  bindtapOpenNoUI: function(e) {
    wx.navigateTo({
      url: "../noUI/noUI",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  }
});
