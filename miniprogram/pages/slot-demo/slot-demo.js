
var plugin = requirePlugin("myPlugin");
var app = getApp();
Page({
    data: {
        motto: '点击 “编译” 以构建',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        test: false
    },
    onLoad: function () {
        var _this = this;
        plugin.init({
            appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7",
            openid: "",
            guideList: ["预订火车票"],
            success: function () {
                _this.setData({
                    test: true
                });
            },
            fail: function (error) { }
        });
    },
    goBackHome: function () {
        console.log('aaa');
    }
});
