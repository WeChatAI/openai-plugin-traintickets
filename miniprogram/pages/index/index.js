Page({
  data: {
    listData: []
  },
  onLoad: function() {},
  bindtapOpenSenior:function (e) {
    wx.navigateTo({
      url: '../senior/senior',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindtapOpenOrdinary: function (e) {
    wx.navigateTo({
      url: '../ordinary/ordinary',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
});
