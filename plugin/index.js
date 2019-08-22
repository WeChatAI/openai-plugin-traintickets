var data = require("./api/data.js");

module.exports = {
  getData: data.getData,
  setData: data.setData,
  init: data.auth
};

function palyVoice(voiceData) {
  if (backgroundAudioManager.src == this.globalData.voiceData.song_play_url) {
    backgroundAudioManager.play()
  } else {
    backgroundAudioManager.title = this.globalData.voiceData.song_name
    backgroundAudioManager.epname = this.globalData.voiceData.album_name
    backgroundAudioManager.singer = this.globalData.voiceData.singer_name
    backgroundAudioManager.coverImgUrl = this.globalData.voiceData.singer_pic
    backgroundAudioManager.src = this.globalData.voiceData.song_play_url
  }
  backgroundAudioManager.onPlay(() => {
    this.globalData.isPlaying = true
    typeof callback == 'function' && callback(this.globalData.isPlaying)
  })
}