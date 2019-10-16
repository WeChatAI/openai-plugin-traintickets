var plugin = requirePlugin("myPlugin");
var sendFun = require("../send/send.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    show: false,
    flag: false,
    isActive: true,
    getDataValue: false
  },
  getQueryCallback: function (e) {
    let listData = this.data.listData
    listData.push(e.detail)
    this.setData({
      listData: listData
    }, () => {
      if (this.data.listData.length == 1 && this.data.getDataValue === true) {
        const chat = plugin.getChatComponent()
        chat.send(this.data.sendData)
      }
    })
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
    const chat = plugin.getChatComponent()
    if (options && options.data)  {
      if (options && options.data === 'switch') {
        this.setData({
          flag: true
        })
      } else if (options && options.data === 'keyboard') {
        chat.editFoucs(true)
      } else if (options.data === 'image') {
        chat.send('图片回复')
      } else if (options.data === 'weather') {
        chat.send('北京天气')
      } else {
        chat.send(options.data)
        if (options.data2) {
          this.setData({
            flag: false,
            getDataValue: true,
            sendData: options.data2
          })
        } else {
          this.setData({
            flag: false
          })
        }
      }
    } else {
      this.setData({
        flag: false
      })
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
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      
    }
    return {
      title: '自定义',
      path: '/pages/home/home',
      imageUrl: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/forward.png'
    }
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