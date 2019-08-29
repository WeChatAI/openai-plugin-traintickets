Page({
  data: {
    listData: []
  },
  onLoad: function() {},
  bindtapOpenSenior:function (e) {
    wx.navigateTo({
      url: '../common/common?data=senior',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  bindtapOpenOrdinary: function (e) {
    wx.navigateTo({
      url: '../common/common?data=ordinary',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
});
