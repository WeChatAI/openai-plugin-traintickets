//app.js

var plugin = requirePlugin("myPlugin");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
      textToSpeech: true,
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
