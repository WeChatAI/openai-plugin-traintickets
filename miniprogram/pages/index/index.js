Page({
  onLoad: function() {},
  gotoPagesWebView: function (e) {
    wx.navigateTo({
        url: '../webView/webView?url=' + e.detail,
      })
  }
});
