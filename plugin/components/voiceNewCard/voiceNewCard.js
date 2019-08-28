var app = require("../../api/music.js");
Component({
  properties: {
    voiceData: Object,
    musicData: Array
  },
  data: {
    isPlaying: false,
    chooseId: 0,
    oldChooseId: 0,
    duration: '00:00',
    currentTime: '00:00',
    percent: 0,
    canvasProgressbg: 'canvasProgressbg0',
    canvasProgress: 'canvasProgress0'
  },
  lifetimes: {
    attached: function () {
      this.drawProgressbg(this.data.canvasProgressbg)
    },
    ready: function () {
      console.log(this.properties.musicData)
      var musicData = this.properties.musicData
      app.data.voiceData = musicData[0]
      app.play((isPlaying) => {
        this.setData({
          isPlaying: isPlaying
        })
      })
      this.getBackgroundAudio()
    },
  },
  methods: {
    drawProgressbg: function (canvasProgressbg) {
      console.log(canvasProgressbg)
      var ctx = wx.createCanvasContext(canvasProgressbg, this)
      console.log(ctx)
      ctx.setLineWidth(4); 
      ctx.setStrokeStyle('#20183b');
      ctx.setLineCap('round') 
      ctx.beginPath(); 
      ctx.arc(85, 85, 67, 0, 2 * Math.PI, false);
      ctx.stroke();
      ctx.draw();
    },

    drawCircle: function (step) {
      var context = wx.createCanvasContext(this.data.canvasProgress, this);
      // 设置渐变
      var gradient = context.createLinearGradient(85, 0, 0, 85);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      context.setLineWidth(4);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath();
      context.arc(85, 85, 67, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke();
      context.draw()
    },
    //获取背景资源
    getBackgroundAudio: function () {
      app.getBackgroundAudio((currentTime, duration) => {
        this.setData({
          duration: this._formatTime(duration),
          currentTime: this._formatTime(currentTime),
          percent: Math.floor(currentTime * 100 / duration)
        }, () => {
          this.drawCircle(2 * currentTime / duration)
        })
      }, () => {
        var that = this
        if (that.data.chooseId < that.data.musicData.length - 1) {
          var chooseId = ++that.data.chooseId
          that.setData({
            chooseId: chooseId,
            duration: '00:00',
            currentTime: '00:00',
            percent: 0,
          }, () => {
            var canvasProgressbg = 'canvasProgressbg' + chooseId
            var canvasProgress = 'canvasProgress' + chooseId
            that.drawProgressbg(canvasProgressbg)
            that.drawCircle(0)
            that.setData({
              canvasProgressbg: canvasProgressbg,
              canvasProgress: canvasProgress
            }, () => {
              that.playVoice()
            })
          })
        }
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
    playSong: function () {
      if (this.data.isPlaying) {
        app.pause((isPlaying) => {
          this.setData({
            isPlaying: isPlaying
          })
        })
      } else {
        app.play((isPlaying) => {
          this.setData({
            isPlaying: isPlaying
          })
        })
      }
      this.getBackgroundAudio()
    },
    changeVoiceData: function (e) {
      var that = this
      if (that.data.chooseId != e.detail.current) {
        var canvasProgressbg = 'canvasProgressbg' + e.detail.current
        var canvasProgress = 'canvasProgress' + e.detail.current
        that.drawProgressbg(canvasProgressbg)
        that.drawCircle(0)
        that.setData({
          chooseId: e.detail.current,
          canvasProgressbg: canvasProgressbg,
          canvasProgress: canvasProgress
        }, () => {
          that.playVoice()
        })
      }
    },
    playVoice: function () {
      var musicData = this.properties.musicData
      var chooseId = this.data.chooseId
      app.data.voiceData = musicData[chooseId]
      app.play((isPlaying) => {
        this.setData({
          isPlaying: true
        })
      })
      this.getBackgroundAudio()
    },
  }
})