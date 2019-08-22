var data = require("../../api/data.js");

const backgroundAudioManager = wx.getBackgroundAudioManager()


Component({
  data: {
    list: [],
    value: '',
    toView: '' 
  },
  attached: function() {
    // 可以在这里发起网络请求获取插件的数据

    // console.log("here am im");

    // const authtoken = wx.getStorageSync("authtoken") || "";
    // if (!authtoken) {
    //   data.auth();
    // } else {
    //   data.send({
    //     query: "今天天气如何",
    //     success: res => {
    //       console.log("reeee", res);
    //     }
    //   });
    // }
  },
 methods: {
   confirm: function (e) {
     let that = this
     let list = this.data.list
     let newData = {
       type: 1,
       text: e.detail.value
     }
     list.push(newData)
     this.setData({
       list: list,
       value: ''
     })
     const authtoken = wx.getStorageSync("authtoken") || "";
     if (!authtoken) {
       data.auth();
     } else {
       data.send({
         query: e.detail.value,
         success: res => {
           console.log("reeee", res);
           var ans_node_name = res.ans_node_name
           var answer_type = res.answer_type
           console.log(ans_node_name)
           console.log(answer_type)
           let newData = {
             type: 0,
             text: res.answer
           }
           list.push(newData)
           this.setData({
             list: list,
             value: ''
           })
           that.scrollToNew()
         }
       });
     }
   },
   scrollToNew: function () {
     this.setData({
       toView: "fake"
     })
   },
 } 
});
