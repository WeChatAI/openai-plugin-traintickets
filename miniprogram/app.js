//app.js

var plugin = requirePlugin("myPlugin");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({ appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7" });
  }
});
