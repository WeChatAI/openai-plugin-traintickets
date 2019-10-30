App({
    onLaunch: function () {
        var _this = this;
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
        wx.login({
            success: function (_res) {
            }
        });
        wx.getSetting({
            success: function (res) {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: function (res) {
                            console.log('res', res)
                            _this.globalData.userInfo = res.userInfo;
                            if (_this.userInfoReadyCallback) {
                                _this.userInfoReadyCallback(res.userInfo);
                            }
                        }
                    });
                }
            }
        });
        var plugin = requirePlugin("myPlugin");
        plugin.init({
            appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7",
            openid: "", // 建议业务方将openid传入
            guideList: ["预订火车票"],
            success: function () {
            },
            fail: function (error) { }
        });
    },
    globalData: {}
});