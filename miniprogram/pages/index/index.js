Page({
  data: {
    list: [{
      text: "对话"
    },
    {
      text: "设置"
    }]
  },
  onLoad: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  bindtapOpenSenior: function(e) {
    wx.navigateTo({
      url: "../senior/senior",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  },
  bindtapOpenOrdinary: function(e) {
    wx.navigateTo({
      url: "../common/common",
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {}
    });
  }
});
