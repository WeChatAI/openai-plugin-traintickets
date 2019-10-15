var sendFun = require("../send/send.js");
Component({
  properties: {
    msg: Object
  },

  data: {
    imageArray: [
      {url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/bg1.png"},
      {url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/bg2.png"},
      {url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/bg3.png"},
      {url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/bg4.png"},
      {url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/bg5.png"}
    ],
    imgArr: [
      {url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/btn1.png'},
      {url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/btn2.png'},
      {url: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/btn3.png'}
    ],
    url: '',
    flag: false,
    list: []
  },
  lifetimes: {
    ready: function () { 
      let that = this
      const result = this.properties.msg
      if (result.content.indexOf('评分') !== -1) {
        if (result.content.indexOf('100') !== -1) {
          that.setData({
            flag:true,
            url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/win.png"
          })
        } else {
          that.setData({
            flag:true,
            url: "https://res.wx.qq.com/mmspraiweb_node/dist/static/openaiplugin/img/dead.png"
          })
        }
        return 
      }
      // const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
      if (result.res.options && result.res.options.length !== 0) {
        result.res.options.forEach((item, index) => {
          item.url = that.data.imgArr[index].url
        })
        that.setData({
          flag:true,
          url: that.data.imageArray[Math.floor(Math.random()* that.data.imageArray.length)].url,
          list: result.res.options
        })
      }
      
    }
  },
  methods: {
    choose:function(e) {
      sendFun.getData(e.currentTarget.dataset.title)
    }
  }
});
