Component({
  properties: {
    msg: Object
  },

  data: {},
  lifetimes: {
    ready: function() {}
  },
  methods: {
    reserve:function() {
      console.log(123)
      wx.navigateToMiniProgram({
        appId: this.properties.msg.data.appid,
        path: '',
        extraData: {
        },
        envVersion: '',
        success(res) {
          // 打开成功
        }
      })
    }
  }
});
