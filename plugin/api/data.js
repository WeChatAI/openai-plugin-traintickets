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
  operateCardHeight: "",
  history: true,
  historySize: 60
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
  operateCardHeight,
  history,
  historySize,
  navHeight
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
    setData("welcome", "");
  }
  if (typeof background !== "undefined") {
    setData("background", background);
  } else {
    setData("background", "#f6f6f6");
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
  if (typeof history !== 'undefined') {
    setData("history", history)
  } else {
    setData("history", true)
  }
  if (typeof historySize !== "undefined") {
    setData("historySize", historySize)
  } else {
    setData("historySize", 60)
  }
  if (typeof navHeight !== "undefined") {
    setData("navHeight", navHeight)
  } else {
    setData("navHeight", 0)
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

function setChatComponent(ui) {
  setData("chatComponent", ui);
}
function getChatComponent() {
  return getData().chatComponent;
  
}

function setNavHeight (navHeight) {
  setData('navHeight', navHeight)
}

function clearChatRecord() {
  wx.removeStorage({
    key: 'chatRecord',
    success (res) {
    }
  })
}

module.exports = {
  getData: getData,
  setData: setData,
  setGuideList: setGuideList,
  setTextToSpeech: setTextToSpeech,
  setWelcome: setWelcome,
  setBackground: setBackground,
  auth: auth,
  send: send,
  getChatComponent,
  setChatComponent,
  setNavHeight,
  clearChatRecord
};
