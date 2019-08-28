// const app = getApp()
var app = require("../../api/music.js");

Component({
  properties: {
    newsData: Object,
  },
  data: {
    newsData: [],
    picWidth: 0,
    picHeight: 200,
    newsPubtime: 0, //发布时间
    playTime: '00:00',
    endTime: '00:00',
    playprogress: 0,
    newsIndex: 0,
    isPlaying: false
  },

  lifetimes: {
    ready: function () {
      var that = this
      // var newsData = this.properties.newsData
      // newsData.docs.forEach(function (v, i) {
      //   newsData.docs[i].pubtime = that.getDateDiff(newsData.docs[i].pubtime)
      //   that.setData({
      //     // 更新属性和数据的方法\更新页面数据的方法
      //     newsData: newsData
      //   })
      // })
      that.playNews()
    },
  },
  methods: {
    toOtherApp: function () {
      if (app.data.isPlaying) {
        app.pause()
      }
      wx.navigateToMiniProgram({
        appId: 'wxc07b7c3f0228cdb1',
        path: 'pages/index/index',
        envVersion: 'release',
        success(res) {
          console.log(res)
        },
        fail: function (res) {
          console.log('fail:', res)
        }
      })
    },
    playControl: function () {
      if (this.data.isPlaying) {
        app.pause((isPlaying) => {
          this.setData({
            isPlaying: false
          })
        })
      }else {
        app.play((isPlaying) => {
          this.setData({
            isPlaying: true
          })
        })
      }
      this.getBackgroundAudio()
    },
    playNews: function () {
      var that = this
      var newsData = that.properties.newsData
      var newsIndex = that.data.newsIndex
      console.log(newsData)
      app.data.voiceData = {
        name: newsData.docs[newsIndex].title,
        album_name: '',
        author: '',
        album_pic_url: newsData.docs[newsIndex].shortcut,
        url: newsData.docs[newsIndex].voice_summary
      }
      app.play((isPlaying) => {
        this.setData({
          isPlaying: true
        })
      })
      that.getBackgroundAudio()
    },
    getBackgroundAudio: function () {
      var that = this
      app.getBackgroundAudio((currentTime, duration) => {
        that.setData({
          endTime: this._formatTime(duration),
          playTime: this._formatTime(currentTime),
          playprogress: Math.floor(currentTime * 100 / duration)
        })
      }, () => {
        if (that.data.newsIndex < that.data.newsData.docs.length - 1) {
          that.setData({
            newsIndex: ++that.data.newsIndex,
            playTime: '00:00',
            endTime: '00:00',
          })
          that.playNews()
        }
        console.log(that.data.newsIndex)
      })
    },
    _formatTime: function (interval) {
      interval = interval | 0
      const minute = interval / 60 | 0
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    /*秒前边加0*/
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    //事件响应函数
    setPicSize: function (e) {
      var width = wx.getSystemInfoSync().windowWidth
      var picWidth = width - 40
      var picHeight = picWidth/1.94
      this.setData({
        picWidth: picWidth,
        picHeight: picHeight
      })
    },
    changeNewsData: function (e) {
      var that = this
      if (that.data.newsIndex != e.detail.current) {
        that.setData({
          newsIndex: e.detail.current
        })
        that.playNews()
      }
    },
    getDateDiff: function (dateTimeStamp) {
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date()/1000;
      var diffValue = now - dateTimeStamp;
      if (diffValue < 0) {return;}
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      var result = ''
      if (monthC >= 1) {
        result = '' + parseInt(monthC) + "月前";
      } else if (weekC >= 1) {
        result = '' + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = '' + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = '' + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = '' + parseInt(minC) + "分钟前";
      } else {
        result = '刚刚';
      }
      return result;
    },
    // 查看更多
    gotoWebView: function (e) {
      var newsData = this.data.newsData.docs
      var newsIndex = this.data.newsIndex
      console.log(newsData[newsIndex].docid)
      // wx.navigateTo({
      //   url: '../webView/webView?url=https://new.qq.com/rain/a/' + newsData[newsIndex].docid,
      // })
      this.triggerEvent('gotoWebView', 'https://new.qq.com/rain/a/' + newsData[newsIndex].docid)
    },
  }
})