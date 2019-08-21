var data = require("../../api/data.js");

Component({
  data: {
    list: []
  },
  attached: function() {
    // 可以在这里发起网络请求获取插件的数据

    console.log("here am im");

    const authtoken = wx.getStorageSync("authtoken") || "";
    if (!authtoken) {
      data.auth();
    } else {
      data.send({
        query: "你好",
        success: res => {
          console.log("reeee", res);
        }
      });
    }
  }
});
