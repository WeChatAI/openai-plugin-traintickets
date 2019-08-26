//app.js

var plugin = requirePlugin("myPlugin");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7",
      success: () => {
        plugin.send({
          query: "你好",
          success: res => {
            console.log(res);
          },
          fail: error => {}
        });
      },
      fail: error => {}
    });
  }
});
