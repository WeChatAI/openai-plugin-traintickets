Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    simple: false
  },

  getQueryCallback: function (e) {
    var listData = this.data.listData
    listData.push(e.detail)
    if (listData.length === 10) {
      wx.navigateTo({
        url: '../newsPage/newsPage',
      })
    }
  },
  goBackHome: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const simple = this.data.simple
    if (options.data === 'senior') {
      this.setData({
        simple: true
      })
    } else {
      this.setData({
        simple: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})