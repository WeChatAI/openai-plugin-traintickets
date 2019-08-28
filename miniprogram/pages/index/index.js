Page({
  onLoad: function() {},
  gotoPagesWebView: function (e) {
    wx.navigateTo({
        url: '../webView/webView?url=' + e.detail,
      })
  },
  bindtapOpen:function (e) {
    wx:wx.navigateTo({
      url: 'plugin://myPlugin/chat-page',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});
