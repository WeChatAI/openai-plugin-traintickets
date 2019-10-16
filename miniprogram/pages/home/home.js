// pages/home/home.js
var plugin = requirePlugin("myPlugin");
const backgroundAudioManager = wx.getBackgroundAudioManager()
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
      { title: "开怀畅饮" },
      { title: "一了百了" },
      { title: "李白桃红" },
      { title: "热肠古道" },
      { title: "道傍苦李" },
      { title: "十全十美" },
      { title: "事败垂成" },
      { title: "成败得失" },
      { title: "九牛一毛" }
    ],
    defaultGuideList: [
      "北京天气怎么样",
      "上海今天有雨吗",
      "中午吃啥呢",
      "你知道如何排解压力吗",
      "法国国土面积是多少",
      "世界最高峰"
    ],
    garbageCardList: [
      { title: '垃圾分类查询' },
      { title: '苹果是什么垃圾' },
      { title: '干垃圾' },
      { title: '珍珠奶茶是什么垃圾' },
      { title: '笔记本电脑是什么垃圾' },
      { title: '秋裤是什么垃圾' },
      { title: '水杯是什么垃圾' }
    ],
    gameList: [
      {
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconOne.png',
        title: '“玩末日生存游戏”'
      },
      {
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/HealthyIcon.png',
        title: '“我想玩猜拳游戏”'
      },
      {
        url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconTwo.png',
        title: '“我想写诗”'
      }
    ],
    chatTitle: {
      title: 'chat'
    },
    encyclopediasTitle: {
      title: 'encyclopedias'
    }

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
    backgroundAudioManager.stop()
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
    if (res.from === 'menu') {
      
    }
    return {
      title: '自定义',
      path: '/pages/home/home',
      imageUrl: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/forward.png'
    }
  },
  // 四个模块
  goChat:function (e) {
    console.log(e)
    if (e.currentTarget.dataset.item.title === '聊天' || e.currentTarget.dataset.item.title === 'chat') {
      this.goChatCard(e)
    } else if (e.currentTarget.dataset.item.title === '天气') {
      this.goWeatherCard(e)
    } else if (e.currentTarget.dataset.item.title === '成语接龙') {
      this.goIdiom(e)
    } else if (e.currentTarget.dataset.item.title === '百科' || e.currentTarget.dataset.item.title === 'encyclopedias') {
      this.goEncyclopedias(e)
    }
  },
  // 默认展示
  gotoChat:function(e) {
    console.log(e)
    if (e.currentTarget.dataset.item === 'keyboard') {
      this.jump('keyboard')
    } else  {
      this.jump()
    }
    plugin.setGuideList(this.data.defaultGuideList)
    plugin.setTextToSpeech(true)
    
  },
  // 没有UI(NLU)展示
  gotoChatNoUI: function () {
    wx.navigateTo({
      url: "../noUI/noUI",
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { }
    });
  },
  // 关闭文本语音播报
  gotoChatcloseVoice:function () {
    plugin.setGuideList(this.data.defaultGuideList)
    plugin.setTextToSpeech(true)
    this.jump('switch')
  },
  // 关于
  goWebview:function() {
    wx.navigateTo({
      url: '../about/about',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 复写组件
  gotoChatCom:function (val) {
    this.jump()
    // if (val) {
    //   wx.navigateTo({
    //     url: '../rewriteChatComponents/rewriteChatComponents?data=' + val,
    //     success: function (res) {
    //     },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../rewriteChatComponents/rewriteChatComponents',
    //     success: function (res) {
    //     },
    //     fail: function (res) { },
    //     complete: function (res) { },
    //   })
    // }
    plugin.setTextToSpeech(true)
    plugin.setGuideList(this.data.defaultGuideList)
  },
  // 图片组件
  goImageCom:function() {
    this.jump('image')
    plugin.setTextToSpeech(true)
    plugin.setGuideList(this.data.defaultGuideList)
  },
  goweatherCom:function() {
    this.jump('weather')
    plugin.setTextToSpeech(true)
    plugin.setGuideList(this.data.defaultGuideList)
  },
  // 跳转页面
  jump:function(val1, val2) {
    if (!val1) {
      wx.navigateTo({
        url: '../pluginChat/pluginChat',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      let url = ''
      if (val1 && !val2) {
        url = '../pluginChat/pluginChat?data=' + val1
      } else if (val1 && val2) {
        url = '../pluginChat/pluginChat?data=' + val1 + '&data2=' + val2
      }
      wx.navigateTo({
        url: url,
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
  // 聊天
  goChatCard:function (e) {
    this.jump('聊天')
    plugin.setGuideList(this.data.chatGuideList)
    plugin.setTextToSpeech(true)
  },
  // 天气
  goWeatherCard:function(e) {
    let weatherGuideList = [
      "北京天气",
      "北京今日防晒指数",
      "上海天气",
      "北京今日空气质量",
      "北京今日风向",
      "上海今日空气质量",
      "上海今日防晒指数"
    ]
    if (this.data.weatherCardList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title) {
        return true
      }
    })) {
      plugin.setGuideList(weatherGuideList)
      this.jump('天气', e.currentTarget.dataset.item.title)
      plugin.setTextToSpeech(true)
    } else {
      plugin.setGuideList(weatherGuideList)
      this.jump('天气')
    }
  },
  // BMI
  goBMI:function(e) {
    if (this.data.queryBMIList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title) {
        return true
      }
    })) {
      let title = ''
      let chatGuideList = ["我想测体质指数", "算一下我的BMI体质指数是多少", "我的身高175BMI体质指数是多少"]
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
      plugin.setGuideList(chatGuideList)
      plugin.setTextToSpeech(true)
    } 
  },
  // 垃圾分类
  goGarbage:function(e) {
    if (this.data.garbageCardList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title) {
        return true
      }
    })) {
      let garbageCardList = [
        '垃圾分类查询',
        '退出垃圾分类查询',
        '苹果是什么垃圾',
        '干垃圾',
        '珍珠奶茶是什么垃圾',
        '笔记本电脑是什么垃圾',
        '秋裤是什么垃圾',
        '水杯是什么垃圾',
        '退出垃圾分类查询'
      ]
      plugin.setGuideList(garbageCardList)
      this.jump('垃圾分类查询', e.currentTarget.dataset.item.title)
      plugin.setTextToSpeech(true)
    } 
  },
  // 游戏
  goGame:function(e) {
    if (this.data.gameList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title) {
        return true
      }
    })) {
      let title = ''
      if (e.currentTarget.dataset.item.title === '“玩末日生存游戏”') {
        title = "玩末日生存游戏"
        plugin.setGuideList([])
      }
      if (e.currentTarget.dataset.item.title === '“我想玩猜拳游戏”') {
        title = "猜拳"
        plugin.setGuideList(['剪刀', '石头', '布', '不玩了', '猜拳'])
      }
      if (e.currentTarget.dataset.item.title === '“我想写诗”') {
        title = "小微写诗"
        plugin.setGuideList([])
      }
      this.jump(title)
      plugin.setTextToSpeech(true)
      
    } 
  },
  // 成语接龙
  goIdiom:function(e) {
    if (this.data.idiomGuideList.find(item => {
      if (item.title === e.currentTarget.dataset.item.title) {
        return true
      }
    }) || e.currentTarget.dataset.item.title === '成语接龙') {
      let idiomGuideList = [
        "准备好了",
        "退出游戏",
        "开怀畅饮",
        "一了百了",
        "李白桃红",
        "热肠古道",
        "道傍苦李",
        "十全十美",
        "事败垂成",
        "成败得失",
        "九牛一毛"
      ]
      plugin.setGuideList(idiomGuideList)
      this.jump('成语接龙')
      plugin.setTextToSpeech(true)
    } 
  },
  // 百科
  goEncyclopedias:function(e) {
    plugin.setGuideList(this.data.encyclopediasGuideList)
    this.jump('百科')
    plugin.setTextToSpeech(true)
  }
})