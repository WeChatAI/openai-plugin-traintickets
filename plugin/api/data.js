var data = {
  guideList: [
    "北京天气怎么样",
    "上海今天有雨吗",
    "中午吃啥呢",
    "你知道如何排解压力吗",
    "法国国土面积是多少",
    "世界最高峰"
  ],
  textToSpeech: true,
  welcome: "",
  background: "",
  voiceStart: false,
  guideCardHeight: "",
  operateCardHeight: ""
};

function getData() {
  return data;
}

function setData(key, value) {
  data[key] = value;
}

const domain = "https://openai.weixin.qq.com";
// const domain = "http://localhost:13563";

function auth({
  appid,
  openid,
  success,
  fail,
  guideList,
  textToSpeech,
  welcome,
  background,
  guideCardHeight,
  operateCardHeight
}) {
  if (guideList) {
    setData("guideList", guideList);
  }
  if (typeof textToSpeech !== "undefined") {
    setData("textToSpeech", textToSpeech);
  }
  if (typeof welcome !== "undefined") {
    if (welcome === "") {
      setData("welcome", "");
    } else {
      setData("welcome", welcome);
    }
  } else {
    setData("welcome", "请问需要什么帮助");
  }
  if (typeof background !== "undefined") {
    setData("background", background);
  } else {
    setData("background", "rgba(247, 251, 252, 1)");
  }

  if (typeof guideCardHeight !== "undefined") {
    setData("guideCardHeight", guideCardHeight);
  } else {
    setData("guideCardHeight", 40);
  }

  if (typeof operateCardHeight !== "undefined") {
    setData("operateCardHeight", operateCardHeight);
  } else {
    setData("operateCardHeight", 145);
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

function setWelcome(setWelcome) {
  setData("welcome", setWelcome);
}

function setBackground(background) {
  setData("background", background);
}

function voiceStart(start) {
  setData("voiceStart", start);
}

function setChatComponent(ui) {
  setData("chatComponent", ui);
}
function getChatComponent() {
  getData("chatComponent");
}

module.exports = {
  getData: getData,
  setData: setData,
  setGuideList: setGuideList,
  setTextToSpeech: setTextToSpeech,
  setWelcome: setWelcome,
  setBackground: setBackground,
  voiceStart: voiceStart,
  auth: auth,
  send: send,
  getChatComponent,
  setChatComponent
};
