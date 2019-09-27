var plugin = requirePlugin("myPlugin");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    show: false,
    flag: false,
    isActive: true
  },
  getQueryCallback: function (e) {
    console.log(e.detail)
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
    const component = this.selectComponent('#component-id');
    if (options && options.switch === 'switch') {
      this.setData({
        flag: true
      })
    } else if (options && options.data && options.data !== '') {
      component.send(options.data)
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowWidth: res.windowWidth - 110
        }, () => {
          this.setData({
            show: true
          })
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
  open:function() {
    plugin.setTextToSpeech(true)
    this.setData({
      isActive: true
    })
  },
  close:function() {
    plugin.setTextToSpeech(false)
    this.setData({
      isActive: false
    })
  }
})