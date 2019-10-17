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
    getDataValue: false,
    title: ''
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
          flag: true,
          title: '语音开关展示'
        })
      } else if (options && options.data === 'keyboard') {
        chat.editFoucs(true)
        this.setData({
          title: '默认展示'
        })
      } else if (options.data === 'image') {
        chat.send('图片回复')
        this.setData({
          title: '图片'
        })
      } else if (options.data === 'weather') {
        chat.send('北京天气')
        this.setData({
          title: '天气'
        })
      } else if (options.data === '我想测体质指数' || options.data === '算一下我的BMI体质指数是多少' || options.data === '我的身高175BMI体质指数是多少') {
        this.setData({
          title: 'BMI'
        })
        chat.send(options.data)
      } else {
        chat.send(options.data)
        if (options.data2) {
          this.setData({
            flag: false,
            getDataValue: true,
            sendData: options.data2,
            title: options.data
          })
        } else {
          this.setData({
            flag: false,
            title: options.data
          })
        }
      }
    } else {
      this.setData({
        flag: false,
        title: '默认展示'
      })
    } 
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.statusBarHeight)
        let isIOS = res.system.indexOf('iOS') > -1
        let navHeight = 0
        if (!isIOS) {
          navHeight = 48
        } else {
          navHeight = 44
        }
        this.setData({
          windowWidth: res.windowWidth - 110,
          status: res.statusBarHeight,
          navHeight: navHeight,
          statusBarHeight: res.statusBarHeight + navHeight
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
      title: '示例小程序',
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
  },
  back:function(e) {
    this.goBackHome()
  }
})