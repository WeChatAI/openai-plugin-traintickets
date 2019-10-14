let plugin;
Component({
  properties: {
    focus: Boolean,
    recording: Boolean,
    inputText: String,
    inputing: Boolean
  },

  data: {
    inputing: false, //值为true时表示正在输入
    inputText: ''
  },
  lifetimes: {
    ready: function() {
      this.setData({
        focus: this.properties.focus,
        inputing: this.properties.inputing
      })
    },
    attached:function () {
    }
  },
  methods: {
    bindInput: function(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    // 输入选择
    chooseType: function(e) {
      if (e.currentTarget.dataset.type == "voice") {
        this.setData({
          inputing: false
        });
      } else {
        this.setData({
          inputing: true
        });
      }
    },
    bindconfirmInput: function(e) {
      var that = this;
      let text = e.detail.value;
      that.triggerEvent("bindInput", text);
      that.setData({
        inputText: ''
      })
    },
    // 返回首页
    showGuideView: function() {
      this.triggerEvent("back");
    },
    // 启动语音
    inputVoiceStart: function() {
      this.triggerEvent('inputVoiceStart')
    },
    // 停止语音
    inputVoiceEnd: function() {
      this.triggerEvent('inputVoiceEnd')
    },
  }
});
