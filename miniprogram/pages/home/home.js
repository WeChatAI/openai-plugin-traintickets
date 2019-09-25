// pages/home/home.js
var plugin = requirePlugin("myPlugin");
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
    let guideList = []
    if (e.currentTarget.dataset.item.name === '天气') {
      guideList = ['北京天气怎么样', '上海今天有雨吗']
    } else if (e.currentTarget.dataset.item.name === '聊天') {
      guideList = ['中午吃啥呢', '你知道如何排解压吗?']
    } else if (e.currentTarget.dataset.item.name === 'FM') {
      guideList = ['我想听郭德纲的相声', '来一段评书']
    } else if (e.currentTarget.dataset.item.name === '百科') {
      guideList = ['法国国土面积是多少', '世界最高峰']
    } else if (e.currentTarget.dataset.item.name === '成语接龙') {
      guideList = ['进入成语接龙', '第一个成语: 一心一意']
    }
    plugin.setGuideList(guideList)
    wx.navigateTo({
      url: '../pluginChat/pluginChat',
      success: function(res) {
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})