
var plugin = requirePlugin("myPlugin");
var app = getApp();
Page({
    data: {
    },
    onLoad: function (param) {
        const chat = plugin.getChatComponent();
        chat.send(param.query);
    },
    goBackHome: function () {
    }
});
