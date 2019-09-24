// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      { name: '天气' },
      { name: '聊天' },
      { name: 'FM' },
      { name: '百科' },
      { name: '成语接龙' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          windowHeight: res.windowHeight - 80
        })
      }
    })
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

  },
  goChat:function (e) {
    console.log(e.currentTarget.dataset.item.name)
    wx:wx.navigateTo({
      url: '../senior/senior',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})