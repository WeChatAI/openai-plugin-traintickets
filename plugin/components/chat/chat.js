var data = require("../../api/data.js");
var music = require("../../api/music.js");
var util = require("../../api/util.js");

//var plugin = requirePlugin("WechatSI");
let manager = {};

Component({
  data: {
    listData: [],
    value: "",
    toView: "",
    recording: false, //值为true时表示正在录音
    onStart: false, //是否启动录音
    inputing: false, //值为true时表示正在输入
    recordText: "嗯，你说..", //录音文字
    isShowSwiperView: true
  },
  attached: function() {
    this.initRecord();
  },
  methods: {
    //--------------------------------------------键盘输入-----------------------------------
    bindInput: function(e) {
      this.setData({
        inputText: e.detail.value
      });
    },
    //完成输入
    bindconfirmInput: function(e) {
      var that = this;
      let text = e.detail.value;
      if (text != "") {
        this.pauseVoice();
        let listData = this.data.listData;
        var newData = {
          content: text,
          data_type: 1
        };

        listData.push(newData);
        that.setData(
          {
            isShowGuideView: false,
            isShowSwiperView: false,
            listData: listData,
            recording: false,
            inputText: ""
          },
          () => {
            this.setData({
              isShowSwiperView: true
            });
          }
        );
        that.getData(text);
        that.scrollToNew();
      }
    },
    //停止背景声音
    pauseVoice: function() {
      if (music.data.isPlaying) {
        music.pause();
      }
    },

    getData: function(val) {
      const authtoken = wx.getStorageSync("authtoken") || "";
      if (!authtoken) {
        data.auth();
      } else {
        data.send({
          query: val,
          success: res => {
            console.log("reeee", res);

            var listData = this.data.listData;
            var that = this;
            var answer_type = res.answer_type;
            var newData = {};
            if (answer_type === "music") {
              if (res.ans_node_name === "音乐") {
                newData = {
                  answer: "",
                  cardType: "voice",
                  docs: JSON.parse(res.more_info.music_ans_detail).play_command
                    .play_list
                };
                listData.push(newData);
                this.setData(
                  {
                    listData: listData,
                    value: ""
                  },
                  () => {
                    that.scrollToNew();
                  }
                );
              } else {
                console.log(
                  JSON.parse(res.more_info.fm_ans_detail).audio_play_command
                    .play_list
                );
                newData = {
                  answer: "",
                  cardType: "voice",
                  docs: JSON.parse(res.more_info.fm_ans_detail)
                    .audio_play_command.play_list
                };
                listData.push(newData);
                this.setData(
                  {
                    listData: listData,
                    value: ""
                  },
                  () => {
                    that.scrollToNew();
                  }
                );
              }
            } else if (answer_type === "news") {
              let more_news = JSON.parse(res.more_info.news_ans_detail).data
                .docs;
              newData = {
                answer: res.msg[0].ans_node_name,
                cardType: "news",
                docs: more_news
              };
              listData.push(newData);
              this.setData(
                {
                  listData: listData,
                  value: ""
                },
                () => {
                  that.scrollToNew();
                }
              );
            } else if (res.ans_node_name === "天气服务") {
              var detail = res.msg;
              let slot_info = JSON.parse(res.slot_info[0].date);
              if (detail != null && detail.length > 0) {
                if (res.dialog_status === "START") {
                  var cardData = {
                    msg_type: "text",
                    content: res.answer
                  };
                  listData.push(cardData);
                  that.setData(
                    {
                      listData: listData
                    },
                    () => {
                      that.scrollToNew();
                    }
                  );
                } else {
                  if (detail.length > 0) {
                    let tempList = detail;
                    for (var i = 0; i < 6; i++) {
                      tempList.push(detail[0]);
                      tempList[i].dateTime = util.dateTimeFormat(
                        slot_info.date
                      );
                      tempList[i].week = util.date2Week(slot_info.date);
                      tempList[i].picture = "qing";
                    }
                    //  tempList[0].dateTime = util.dateTimeFormat(slot_info.date)
                    //  tempList[0].week = util.date2Week(slot_info.date)
                    console.log(tempList);
                    var newData = {
                      answer: res.answer,
                      cardType: "weather",
                      docs: tempList
                    };
                    listData.push(newData);
                    that.setData(
                      {
                        listData: listData
                      },
                      () => {
                        that.scrollToNew();
                      }
                    );
                  }
                }
              } else {
                if (data.wxbot_res.answer != "") {
                  var cardData = {
                    msg_type: "text",
                    content: data.wxbot_res.answer
                  };
                  listData.push(cardData);
                  that.setData(
                    {
                      listData: listData
                    },
                    () => {
                      that.scrollToNew();
                    }
                  );
                }
              }
            } else {
              newData = {
                msg_type: "text",
                content: res.answer
              };
              listData.push(newData);
              this.setData(
                {
                  listData: listData,
                  value: ""
                },
                () => {
                  that.scrollToNew();
                }
              );
            }
            setTimeout(() => {
              this.triggerEvent("queryCallback", { query: val, data: res });
            }, 1000);
          }
        });
      }
    },
    // 输入选择
    chooseType: function(e) {
      if (e.currentTarget.dataset.type == "voice") {
        this.setData({
          inputing: false
        });
      } else {
        this.setData({
          inputing: true
        });
      }
    },
    // 返回首页
    showGuideView: function() {
      this.pauseVoice();
      this.triggerEvent("backHome");
      //  this.setData({
      //    isShowGuideView: true,
      //    isShowSwiperView: false
      //  })
      //  this.animation
      //    .translate(0, 0)
      //    .scale(1)
      //    .step()
      //  this.setData({
      //    animation: this.animation.export(),
      //  })
    },
    // 启动语音
    inputVoiceStart: function() {
      var that = this;
      this.pauseVoice();
      let listData = this.data.listData;
      var newData = {
        content: "",
        data_type: 1
      };
      listData.push(newData);
      this.setData(
        {
          listData: listData,
          recording: true
        },
        () => {
          that.scrollToNew();
        }
      );
      manager.start({ log: "showmedetail" });
      //  if (!this.data.onStart && !this.data.isStartOk) {
      //    console.log('start')
      //    this.setData({
      //      isStartOk: true
      //    })
      //    manager.start({ 'log': 'showmedetail' })
      //    let listData = this.data.listData
      //    var newData = {
      //      content: '',
      //      data_type: 1
      //    }

      //    listData.push(newData)
      //    this.setData({
      //      listData: listData,
      //      recording: true,
      //      isShowGuideView: false
      //    })
      //  } else {
      //    wx.showToast({
      //      title: '加载录音中，请稍后重试...',
      //      icon: 'none',
      //      duration: 2000
      //    })
      //  }
    },
    // 停止语音
    inputVoiceEnd: function() {
      let listData = this.data.listData;
      listData.splice(listData.length - 1, 1);
      manager.stop();
      //  if (!this.data.recording) {
      //    console.log('record has finished')
      //    return
      //  }
      //  if (this.data.recording && this.data.onStart) {
      //    setTimeout(function () {
      //      console.log('手势stop')
      //      manager.stop()
      //    }, 500)
      //  }
      //  this.setData({
      //    recording: false
      //  })
    },
    // 启动语音初始化
    initRecord: function() {
      var that = this;

      var plugin = requirePlugin("WechatSI");
      manager = plugin.getRecordRecognitionManager();

      manager.onStart = res => {
        console.log("onStart");

        //  if (res.msg == 'Ok') {
        //    if (!that.data.recording) {
        //      setTimeout(function () {
        //        console.log('自动stop')
        //        manager.stop()
        //      }, 500)
        //    }
        //    that.setData({
        //      recording: true,
        //      isStartOk: false,
        //      onStart: true
        //    })
        //  }
      };
      manager.onStop = res => {
        console.log("onStop");
        var text = res.result;
        if (text != "") {
          text = text.substr(0, text.length - 1);
          text = text.replace(/，/g, "");
          let listData = this.data.listData;
          var newData = {
            content: text,
            data_type: 1
          };
          // listData[listData.length -1] = newData
          listData.push(newData);
          that.setData(
            {
              isShowGuideView: false,
              isShowSwiperView: false,
              listData: listData,
              recording: false,
              onStart: false
            },
            () => {
              this.setData({
                isShowSwiperView: true,
                recordText: "嗯，你说.."
              });
            }
          );
          that.getData(text);
          that.scrollToNew();
        } else {
          that.setData({
            listData: this.data.listData,
            recording: false,
            onStart: false
          });
        }
      };
      manager.onRecognize = res => {
        //  var text = res.result
        //  if (text != '') {
        //    text = text.substr(0, text.length - 1)
        //    text = text.replace(/，/g, '')
        //    let listData = this.data.listData
        //    var newData = {
        //      content: text,
        //      data_type: 1
        //    }
        //    listData[0] = newData
        //    this.setData({
        //      recordText: text,
        //      listData: listData,
        //      recording: true
        //    })
        //  }
      };

      // 识别错误事件
      manager.onError = res => {
        console.log("onError");
        console.log(res);
        this.setData({
          recording: false,
          onStart: false
        });
      };
    },

    /**
     * 重新滚动到底部
     */
    scrollToNew: function() {
      this.setData({
        toView: "fake"
      });
    },
    choosePageGuide2: function(e) {
      this.pauseVoice();
      var that = this;
      var listData = this.data.listData;
      var newData = {
        content: e.detail,
        data_type: 1
      };
      listData.push(newData);
      that.setData(
        {
          isShowGuideView: false,
          isShowSwiperView: false,
          listData: listData
        },
        () => {
          that.scrollToNew()
          this.setData({
            isShowSwiperView: true
          });
          that.getData(newData.content);
        }
      );
    },
    gotoComWebView: function(e) {
      this.triggerEvent("gotoComWebView", e.detail);
    }
  }
});
