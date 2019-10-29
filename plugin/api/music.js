
const backgroundAudioManager = wx.getBackgroundAudioManager()

var data = {
  isPlaying: false, //是否播放中
  voiceData: {}, //媒体数据
  playTime: 0, //播放进度
  loopTpye: false, //循环设置
  cardId: -1 // 当前播放的card的id
}

//播放
function play (callback) {
  if (backgroundAudioManager.src == this.data.voiceData.url) {
    backgroundAudioManager.play()
  } else {
    backgroundAudioManager.title = this.data.voiceData.name
    backgroundAudioManager.epname = this.data.voiceData.album_name
    backgroundAudioManager.singer = this.data.voiceData.author
    backgroundAudioManager.coverImgUrl = this.data.voiceData.album_pic_url
    backgroundAudioManager.src = this.data.voiceData.url
  }
  backgroundAudioManager.onPlay(() => {
    this.data.isPlaying = true
    typeof callback == 'function' && callback(this.data.isPlaying)
  })
}
//暂停
function pause (callback) {
  backgroundAudioManager.pause()
  backgroundAudioManager.onPause(() => {
    //主动停止
    this.data.isPlaying = false
    typeof callback == 'function' && callback(this.data.isPlaying)
  })
}
function getBackgroundAudio (callback, callback2, callback3) {
  backgroundAudioManager.onTimeUpdate(() => {
    const currentTime = backgroundAudioManager.currentTime
    const duration = backgroundAudioManager.duration
    this.data.currentTime = currentTime
    this.data.duration = duration
    typeof callback == 'function' && callback(currentTime, duration)
  })
  backgroundAudioManager.onEnded(() => {
    //背景音频自然播放结束事件
    typeof callback2 == 'function' && callback2()
  })
  backgroundAudioManager.onPrev(() => {
    //播放面板点击下一曲事件
    this.bindTapPrev()
    typeof callback2 == 'function' && callback2()
  })
  backgroundAudioManager.onNext(() => {
    //播放面板点击上一曲事件
    this.bindTapNext()
    typeof callback2 == 'function' && callback2()
  })
  backgroundAudioManager.onStop(() => {
    //背景音频停止事件
    typeof callback3 == 'function' && callback3()
  })
}
//跳转到指定位置
function seek (callback) {
  backgroundAudioManager.seek(this.data.playTime)
  var that = this
  setTimeout(function () {
    typeof callback == 'function' && callback(that.data.playTime)
  }, 500)
}

module.exports = {
  data,
  play,
  pause,
  getBackgroundAudio,
  seek
};
