var plugin = requirePlugin("myPlugin");

Page({
  onLoad: function() {
    plugin.setData("secrect:abc");
  }
});
