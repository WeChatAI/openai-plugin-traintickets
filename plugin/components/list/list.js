Component({
  data: {
    list: []
  },
  attached: function() {
    // 可以在这里发起网络请求获取插件的数据
    wx.login({
      success: res => {
        console.log("res", res);
      }
    });

    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function(res) {
              var userInfo = res.userInfo;
              console.log("user", res);
            }
          });
        }
      }
    });

    console.log("here am im");

    this.setData({
      list: [
        {
          name: "电视",
          price: 2000
        },
        {
          name: "电脑",
          price: 4000
        },
        {
          name: "手机",
          price: 3000
        }
      ]
    });
  }
});
