
const backgroundAudioManager = wx.getBackgroundAudioManager()

var data = {
  isPlaying: false, //是否播放中
  voiceData: {}, //媒体数据
  playTime: 0, //播放进度
  loopTpye: false, //循环设置
}

//播放
function play (callback) {
  console.log(this.data)
  console.log(backgroundAudioManager.src)
  console.log(this.data.voiceData.music_url)
  if (backgroundAudioManager.src == this.data.voiceData.music_url) {
    backgroundAudioManager.play()
  } else {
    backgroundAudioManager.title = this.data.voiceData.song_name
    backgroundAudioManager.epname = this.data.voiceData.album_name
    backgroundAudioManager.singer = this.data.voiceData.singer_name
    backgroundAudioManager.coverImgUrl = this.data.voiceData.pic_url
    backgroundAudioManager.src = this.data.voiceData.music_url
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
function getBackgroundAudio (callback, callback2) {
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
