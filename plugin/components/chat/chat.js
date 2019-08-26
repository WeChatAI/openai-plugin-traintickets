var data = require("../../api/data.js");

const backgroundAudioManager = wx.getBackgroundAudioManager()

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

Component({
  data: {
    list: [],
    value: '',
    toView: '',
    isInput: true,
    status: false,
    statusWord: '按住说话'
  },
  attached: function() {
    this.initRecord()
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
       type: '1',
       text: e.detail.value
     }
     list.push(newData)
     this.setData({
       list: list,
       value: ''
     }, () => {
       that.scrollToNew()
       that.getData(e.detail.value)
     })
   },
   scrollToNew: function () {
     this.setData({
       toView: "fake"
     })
   },
   start: function (e) {
     manager.start({ duration: 60000, lang: "zh_CN" })
     this.setData({
       status: true,
       statusWord: '松开结束'
     })
   },
   end: function (e) {
     manager.stop()
     this.setData({
       status: false,
       statusWord: '按住说话'
     })
   },
   initRecord: function () {
     var that = this
     manager.onStart = (res) => {
       console.log('onStart')
     }
     manager.onStop = (res) => {
       console.log(res.result)
       let list = this.data.list
       let newData = {
         type: '1',
         text: res.result
       }
       list.push(newData)
       this.setData({
         list: list,
         value: ''
       }, () => {
         console.log(that.data.list)
         that.getData(res.result)
         that.scrollToNew()
       })
     }
     manager.onRecognize = (res) => {
       console.log(res.result)
     }
     // 识别错误事件
     manager.onError = (res) => {
       console.log('onError')
       console.log(res)
     }
   },
   getData: function (val) {
     const authtoken = wx.getStorageSync("authtoken") || "";
     if (!authtoken) {
       data.auth();
     } else {
       data.send({
         query: val,
         success: res => {
           console.log("reeee", res);
           var list = this.data.list
           var that = this
           var answer_type = res.answer_type
           var newData = {}
           if (answer_type === 'music') {
             newData = {
               type: 0,
               answer_type: 'voice',
               docs: res.msg
             }
             list.push(newData)
             this.setData({
               list: list,
               value: ''
             }, () => {
             })
           } else if (answer_type === 'news') {
             let msgData = {
               ans_node_name: res.msg[0].ans_node_name,
               articles: res.msg[0].articles
             }
             newData = {
               type: 0,
               answer_type: 'news',
               newsData: msgData
             }
             list.push(newData)
             this.setData({
               list: list,
               value: ''
             }, () => {
               console.log(that.data.list)
             })
           } else {
             newData = {
               type: 0,
               answer_type: 'text',
               text: res.answer
             }
             list.push(newData)
             this.setData({
               list: list,
               value: ''
             }, () => {
             })
           }
           that.scrollToNew()
         }
       });
     }
   },
   voiceTap: function () {
     this.setData({
       isInput: false
     })
   },
   wordTap: function () {
     this.setData({
       isInput: true
     })
   }
 } 
});
