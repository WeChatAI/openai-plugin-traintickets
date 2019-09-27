// pages/home/home.js
var plugin = requirePlugin("myPlugin");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '微信对话开放平台',
    info: '微信对话开放平台是以对话交互为核心, 为有客服需求的个人、企业和组织提供智能业务服务与用户管理能力的技能配置平台, 技能开发者可利用我们提供的工具自主完成客服机器人的搭建。',
    weatherCardList: [
      { title: '北京天气' },
      { title: '北京今日防晒指数' },
      { title: '上海天气' },
      { title: '北京今日空气质量' },
      { title: '北京今日风向' },
      { title: '北京今日防晒指数' },
      { title: '上海今日防晒指数' }
    ],
    cardList: [
      {
        title: '聊天',
        content: '中午吃啥呢 你知道如何排解压力吗',
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/chatIcon.png'
      },
      {
        title: '天气',
        content: '查询国内外主要城市的温度、风力、污染',
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/weatherIcon.png'
      },
      {
        title: '百科',
        content: '北京今天天气如何 今天有雨吗',
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/encyclopedias.png'
      },
      {
        title: '成语接龙',
        content: '陪你玩成语接龙游戏',
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/idiom.png'
      }
    ],
    queryBMIList: [
      { 
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconOne.png',
        title: '“我想测体质指数”'
      },
      {
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/HealthyIcon.png',
        title: '“算一下我的BMI体质指数是多少”'
      },
      {
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconTwo.png',
        title: '“我的身高175BMI体质指数是多少”'
      }
    ],
    weatherGuideList: [
      '北京天气',
      '上海天气',
      '广州天气',
      '深圳天气',
      '沈阳天气',
      '杭州天气'
    ],
    chatGuideList: [
      "你早上吃什么",
      "你在干嘛",
      "想我了吗",
      "你知道如何排解压力吗"
    ],
    encyclopediasGuideList: [
      '珠穆朗玛峰',
      "喜马拉雅山",
      "长江",
      "黄河",
      "中国的面积"
    ],
    idiomGuideList: [
      "一心一意",
      "一了百了",
      "四面八方",
      "十全十美",
      "九牛一毛"
    ],
    defaultGuideList: [
      "北京天气怎么样",
      "上海今天有雨吗",
      "中午吃啥呢",
      "你知道如何排解压力吗",
      "法国国土面积是多少",
      "世界最高峰"
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          infoheight: res.windowWidth * 277 / 375,
          weatherheight: (res.windowWidth - 34) * 235 / 341
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
    console.log(e)
    if (e.currentTarget.dataset.item.title === '聊天') {
      plugin.setGuideList(this.data.chatGuideList)
      this.jump(e.currentTarget.dataset.item.title)
    } else if (e.currentTarget.dataset.item.title === '百科') {
      plugin.setGuideList(this.data.encyclopediasGuideList)
      this.jump(e.currentTarget.dataset.item.title)
    } else if (e.currentTarget.dataset.item.title === '成语接龙') {
      plugin.setGuideList(this.data.idiomGuideList)
      this.jump(e.currentTarget.dataset.item.title)
    } else if (e.currentTarget.dataset.item.title === '天气') {
      plugin.setGuideList(this.data.weatherGuideList)
      this.jump(e.currentTarget.dataset.item.title)
    } else if (this.data.weatherCardList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title){
        return true
      }
    })) {
      let weatherGuideList = [
        "北京天气",
        "北京今日防晒指数",
        "上海天气",
        "北京今日空气质量",
        "北京今日风向",
        "上海今日空气质量",
        "上海今日防晒指数"
      ]
      plugin.setGuideList(weatherGuideList)
      this.jump(e.currentTarget.dataset.item.title)
    } else if (this.data.queryBMIList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title){
        return true
      }
    })) {
      let title = ''
      let chatGuideList = ["我想测体质指数", "算一下我的BMI体质指数是多少", "我的身高175BMI体质指数是多少"]
      plugin.setGuideList(chatGuideList)
      if (e.currentTarget.dataset.item.title === '“我想测体质指数”') {
        title = "我想测体质指数"
      }
      if (e.currentTarget.dataset.item.title === '“算一下我的BMI体质指数是多少”') {
        title = "算一下我的BMI体质指数是多少"
      }
      if (e.currentTarget.dataset.item.title === '“我的身高175BMI体质指数是多少”') {
        title = "我的身高175BMI体质指数是多少"
      } 
      this.jump(title)
    }
    plugin.setTextToSpeech(true)
  },
  gotoChat:function() {
    plugin.setGuideList(this.data.defaultGuideList)
    plugin.setTextToSpeech(true)
    this.jump()
  },
  gotoChatNoUI: function () {
    wx.navigateTo({
      url: "../noUI/noUI",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    });
  },
  gotoChatcloseVoice:function () {
    plugin.setGuideList(this.data.defaultGuideList)
    plugin.setTextToSpeech(true)
    this.jump('switch')
  },
  goWebview:function() {
    wx.navigateTo({
      url: '../about/about',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  gotoChatCom:function () {
    plugin.setTextToSpeech(true)
    wx.navigateTo({
      url: '../rewriteChatComponents/rewriteChatComponents',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  jump:function(val) {
    console.log(val)
    if (val === 'switch') {
      wx.navigateTo({
        url: '../pluginChat/pluginChat?switch=' + val,
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else if (!val) {
      wx.navigateTo({
        url: '../pluginChat/pluginChat',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      wx.navigateTo({
        url: '../pluginChat/pluginChat?data=' + val,
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})