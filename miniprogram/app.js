//app.js

var plugin = requirePlugin("myPlugin");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "VEgbxLa9kYqzGOzstdeSF3xDbkS9zK",
      // appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
      textToSpeech: true,
      // guideList: ["玩末日生存游戏"],
      welcome: '请问需要什么帮助',
      success: () => {
        // plugin.send({
        //   query: "你好",
        //   success: res => {
        //     console.log(res);
        //   },
        //   fail: error => {}
        // });
      },
      fail: error => {}
    });
  }
});
