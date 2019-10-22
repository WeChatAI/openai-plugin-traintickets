var plugin = requirePlugin("myPlugin");

var util = require("../base/date.js");
var chinese2letter = require("../base/weather.js")
Component({
  properties: {
    msg: Object
  },

  data: {
    weatherDis: {},
    weatherArray: [],
    locationInfo: "", //位置信息
    dateTime: "", //日期
    weekTime: "", //星期
    weatherImg: "qing", //天气icon
    mintp: 0, //最低温度
    maxtp: 0, //最高温度
    nowtp: 0, //当前温度
    weatherName: "", //天气名称
    queryBMIList: [
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconOne.png",
        description: "北京今天空气质量"
      },
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/HealthyIcon.png",
        description: "北京今日防晒指数"
      },
      {
        url:
          "https://res.wx.qq.com/mmspraiweb_node/dist/static/pluginimage/iconTwo.png",
        description: "北京明天的天气"
      }
    ]
  },
  lifetimes: {
    ready: function() {
     
      // chat.send("asdf");
      //日期转化为星期
      console.log(this.properties.msg, "---weather---");
      let weatherDis = this.properties.msg;
      let weatherArray = weatherDis.docs;
      let tempList = []
      for(let i = 1; i <= 6 ; i++) {
        tempList.push(weatherArray.data[i])
      }
      for(let j = 0; j < tempList.length; j++) {
        tempList[j].dateTime = util.dateTimeFormat(tempList[j].date)
        tempList[j].week = util.date2Week(tempList[j].date)
        tempList[j].picture = chinese2letter.chinese2letter(tempList[j].condition)
      }
      let mintp = tempList[0].min_tp;
      let maxtp = tempList[0].max_tp;
      let nowtp = tempList[0].tp;
      let dateTime = tempList[0].dateTime;
      let weekTime = tempList[0].week;
      let weatherImg = tempList[0].picture;
      let weatherName = tempList[0].condition;
      this.setData({
        weatherDis: weatherDis,
        weatherArray: tempList,
        dateTime: dateTime,
        weekTime: weekTime,
        mintp: mintp,
        maxtp: maxtp,
        nowtp: nowtp,
        weatherName: weatherName,
        weatherImg: weatherImg
      });
    }
  },
  methods: {
    send: function(e) {
      const chat = plugin.getChatComponent();
      chat.send(e.currentTarget.dataset.item.description)
    }
  }
});
