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
    weatherName: "" //天气名称
  },
  lifetimes: {
    ready: function () {
      //日期转化为星期
      console.log(this.properties.msg, "---weather---");
      let weatherDis = this.properties.msg;
      console.log(weatherDis);
      let weatherArray = weatherDis.docs;
      let mintp = 17;
      let maxtp = 32;
      let nowtp = 25;
      let dateTime = weatherArray[0].dateTime;
      let weekTime = weatherArray[0].week;
      let weatherImg = "qing";
      let weatherName = "晴";
      this.setData({
        weatherDis: weatherDis,
        weatherArray: weatherArray,
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
  methods: {}
});
