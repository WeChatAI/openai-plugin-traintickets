Page({
  data: {},
  onLoad: function() {},
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
