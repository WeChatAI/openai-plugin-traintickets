const music = require("../../api/music.js");
Component({
  properties: {
    msg: {
      type: Object,
      observer: function(newVal, oldVal) {
        this.setData({
          isPlaying: newVal.isPlaying
        })
      }
    },
    cardId: Number
  },
  data: {
    isPlaying: false,
    chooseId: 0,
    oldChooseId: 0,
    duration: "00:00",
    currentTime: "00:00",
    percent: 0,
    nowMusicCurrent: 0,
    swiperMusicAry: [],
    musicData: []
  },

  lifetimes: {
    ready: function() {
      var musicData = this.properties.msg.docs;
      var swiperMusicAry = [];
      music.data.voiceData = musicData[0];
      if (this.properties.msg.isPlaying) {
        if (music.data.cardId !== -1) {
          let params = {
            cardId: music.data.cardId,
            flag: false
          }
          this.triggerEvent('changeCardID', params)
        } 
        let params = {
          cardId: this.properties.cardId,
          flag : true
        }
        this.triggerEvent('changeCardID', params)
        music.data.cardId = this.properties.cardId
        music.play(isPlaying => {
          this.setData({
            isPlaying: true
          });
        });
      }
      this.getBackgroundAudio();

      for (var i = 0; i < musicData.length; i++) {
        if (i % 4 == 0) {
          swiperMusicAry.push(true);
        }
      }
      this.setData({
        // 更新属性和数据的方法\更新页面数据的方法
        swiperMusicAry: swiperMusicAry,
        musicData,
        isPlaying: this.properties.msg.isPlaying
      });
      console.log("swiperItem", swiperMusicAry);
    }
  },
  methods: {
    //获取背景资源
    getBackgroundAudio: function() {
      music.getBackgroundAudio(
        (currentTime, duration) => {
          if (!this.data.sliderchange) {
            this.setData({
              duration: this._formatTime(duration),
              currentTime: this._formatTime(currentTime),
              percent: Math.floor((currentTime * 100) / duration)
            });
          }
        },
        () => {
          var that = this;
          if (that.data.chooseId < that.data.musicData.length - 1) {
            var chooseId = ++that.data.chooseId;
            var nowMusicCurrent = parseInt(that.data.chooseId / 4);
            // if (that.data.chooseId / 4 < 1) {
            //   nowMusicCurrent = 0
            // } else if (that.data.chooseId / 4 >= 1 && that.data.chooseId / 4 < 2){
            //   nowMusicCurrent = 1
            // } else {
            //   nowMusicCurrent = 2
            // }
            console.log(nowMusicCurrent);
            that.setData(
              {
                chooseId: chooseId,
                duration: "00:00",
                currentTime: "00:00",
                percent: 0,
                nowMusicCurrent: nowMusicCurrent
              },
              () => {
                music.data.voiceData = that.data.musicData[that.data.chooseId];
                music.play(isPlaying => {
                  that.setData({
                    isPlaying: true
                  });
                });
                that.getBackgroundAudio();
              }
            );
          }
        },
        () => {
          var that = this;
          setTimeout(function() {
            that.setData({
              isPlaying: false,
              currentTime: "0:00"
            });
          }, 400);
        }
      );
    },
    _formatTime: function(interval) {
      interval = interval | 0;
      const minute = (interval / 60) | 0;
      const second = this._pad(interval % 60);
      return `${minute}:${second}`;
    },
    /*秒前边加0*/
    _pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },
    //事件响应函数
    musicCurrentChange: function(e) {
      var that = this;
      that.setData({
        nowMusicCurrent: e.detail.current
      });
    },
    playItemSong: function(e) {
      var that = this;
      var musicData = this.data.musicData;
      var index = e.currentTarget.dataset.id;
      var chooseId = this.data.chooseId;
      if (chooseId == index && this.data.isPlaying) {
        //暂停
        music.pause(isPlaying => {
          this.setData({
            isPlaying: false
          });
        });
        let params = {
          cardId: this.properties.cardId,
          flag : false
        }
        this.triggerEvent('changeCardID', params)
      } else {
        if (music.data.cardId !== -1) {
          let params = {
            cardId: music.data.cardId,
            flag: false
          }
          this.triggerEvent('changeCardID', params)
        } 
        let params = {
          cardId: this.properties.cardId,
          flag : true
        }
        this.triggerEvent('changeCardID', params)
        music.data.cardId = this.properties.cardId
        //播放
        music.data.voiceData = musicData[index];
        music.play(isPlaying => {
          that.setData({
            isPlaying: true,
            chooseId: index
          });
        });
        that.getBackgroundAudio();
      }
    },
    playSong: function() {
      if (this.data.isPlaying) {
        music.pause(isPlaying => {
          this.setData({
            isPlaying: isPlaying
          });
        });
        let params = {
          cardId: this.properties.cardId,
          flag : false
        }
        this.triggerEvent('changeCardID', params)
      } else {
        if (music.data.cardId !== -1) {
          let params = {
            cardId: music.data.cardId,
            flag: false
          }
          this.triggerEvent('changeCardID', params)
        } 
        let params = {
          cardId: this.properties.cardId,
          flag : true
        }
        this.triggerEvent('changeCardID', params)
        music.data.cardId = this.properties.cardId
        music.data.voiceData = this.data.musicData[this.data.chooseId]
        music.play(isPlaying => {
          this.setData({
            isPlaying: isPlaying
          });
        });
      }
      this.getBackgroundAudio();
    }
  }
});
