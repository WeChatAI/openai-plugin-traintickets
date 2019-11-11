var pro = require("../../../project.config.json")
Component({
  properties: {
    msg: Object
  },

  data: {},
  lifetimes: {
    ready: function() {
      console.log(pro)
    }
  },
  methods: {
    reserve:function() {
      // 唤起其他小程序
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
      // 当前小程序页面跳转
      // wx.navigateTo({
      //   url: this.properties.msg.data.pagepath
      // })
    }
  }
});
