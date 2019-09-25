var data = {
  guideList: [
    "北京天气怎么样",
    "上海今天有雨吗",
    "中午吃啥呢",
    "你知道如何排解压力吗",
    "法国国土面积是多少",
    "世界最高峰"
  ],
  textToSpeech: true
};

function getData() {
  return data;
}

function setData(key, value) {
  data[key] = value;
}

const domain = "https://openai.weixin.qq.com";
// const domain = "http://localhost:13563";

function auth({ appid, openid, success, fail, guideList, textToSpeech }) {
  if (guideList) {
    setData("guideList", guideList);
  }
  if (typeof textToSpeech !== "undefined") {
    setData("textToSpeech", textToSpeech);
  }

  wx.request({
    url: domain + "/auth/miniprogram/plugin/openai",
    method: "post",
    data: {
      appid,
      openid
    },
    success: res => {
      wx.setStorageSync("authtoken", res.data.authtoken);
      if (success) {
        success.call(null);
      }
    },
    fail: error => {
      if (fail) {
        fail.call(null, error);
      }
    }
  });
}

function request(opt) {
  const authtoken = wx.getStorageSync("authtoken") || "";
  wx.request({
    url: domain + opt.url,
    method: opt.method,
    header: {
      authtoken
    },
    data: opt.data,
    success: opt.success,
    fail: opt.fail
  });
}

function send({ query, success, fail }) {
  request({
    url: "/miniprogram/openai/chatbot",
    method: "post",
    data: {
      query
    },
    success: function(res) {
      if (success) {
        success.call(null, res.data);
      }
    },
    fail: error => {
      if (error) {
        fail.call(null, error);
      }
    }
  });
}

function setGuideList(guideList) {
  setData("guideList", guideList);
}

function setTextToSpeech(textToSpeech) {
  setData("textToSpeech", textToSpeech);
}

module.exports = {
  getData: getData,
  setData: setData,
  setGuideList: setGuideList,
  setTextToSpeech: setTextToSpeech,
  auth: auth,
  send: send
};
