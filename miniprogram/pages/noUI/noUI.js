var plugin = requirePlugin("myPlugin");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    answer: "",
    question: ""
  },
  send: function(e) {
    console.log(e.detail.value);
    plugin.send({
      query: e.detail.value,
      success: res => {
        this.setData({
          answer: res.answer
        });
      }
    });

    console.log("apinlp", plugin.api);
    plugin.api.tokenize(e.detail.value).then(e => {
      console.log("all", e);
    });
  },
  focus: function(e) {
    this.setData({
      answer: "",
      question: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getSystemInfo({
      success: res => {
        let isIOS = res.system.indexOf("iOS") > -1;
        let navHeight = 0;
        if (!isIOS) {
          navHeight = 48;
        } else {
          navHeight = 44;
        }
        this.setData({
          status: res.statusBarHeight,
          navHeight: navHeight,
          statusBarHeight: res.statusBarHeight + navHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},
  back: function(e) {
    wx.navigateBack({
      delta: 1
    });
  }
});
