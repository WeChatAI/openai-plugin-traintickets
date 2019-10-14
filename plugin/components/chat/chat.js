var data = require("../../api/data.js");
var music = require("../../api/music.js");
var util = require("../../api/util.js");
const backgroundAudioManager = wx.getBackgroundAudioManager();

//var plugin = requirePlugin("WechatSI");
let manager = {};
let plugin;

Component({
  data: {
    listData: [],
    value: "",
    toView: "",
    recording: false, //值为true时表示正在录音
    onStart: false, //是否启动录音
    inputing: false, //值为true时表示正在输入
    recordText: "嗯，你说..", //录音文字
    isShowSwiperView: true,
    controlSwiper: true,
    guideList: [],
    focus: false,
    welcome: '',
    welcomeVal: false
  },

  behaviors: ["wx://component-export"],
  export() {
    var that = this;
    return {
      send: function(val) {
        let listData = that.data.listData;
        var newData = {
          content: val,
          data_type: 1
        };

        listData.push(newData);

        that.getData(val);
      },
      editFoucs: function(val) {
        if (val) {
          setTimeout(() => {
            that.setData({
              focus: val,
              inputing: true
            })
          }, 1000)
        }
      }
    };
  },

  attached: function() {
    const operateCardHeight =  data.getData().operateCardHeight
    const guideCardHeight =  data.getData().guideCardHeight
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          scrollHeight: res.windowHeight - operateCardHeight - guideCardHeight,
          operateCardHeight: operateCardHeight,
          guideCardHeight: guideCardHeight
        })
      }
    })
    
    console.log(operateCardHeight)
    console.log(guideCardHeight)
    console.log(this.data.scrollHeight)
    
    const chatReCord = wx.getStorageSync('chatRecord')
    if (chatReCord && chatReCord.length !== 0) {
      this.setData({
        listData: chatReCord
      })
    }
    if (data.getData().welcome && data.getData().welcome !== '') {
      this.setData({
        welcome: data.getData().welcome,
        welcomeVal: false
      })
    } else {
      this.setData({
        welcomeVal: false
      })
    }
    if (data.getData().background) {
      this.setData({
        background: data.getData().background
      })
    }
    this.setData({
      guideList: data.getData().guideList
    });
    
    this.initRecord();
  },
  ready:function() {
  },
  methods: {
    //--------------------------------------------键盘输入-----------------------------------
    // bindInput: function(e) {
    //   this.setData({
    //     inputText: e.detail.value
    //   });
    // },
    //完成输入
    bindconfirmInput: function(e) {
      var that = this;
      let text = e.detail;
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
    bindInutvalue:function (e) { 
      this.bindconfirmInput(e)
    },
    //停止背景声音
    pauseVoice: function() {
      if (music.data.isPlaying) {
        music.pause();
      }
    },

    /**
     * send
     */
    send: function(val) {
      this.getData(val);
    },

    getData: function(val) {
      const authtoken = wx.getStorageSync("authtoken") || "";
      if (!authtoken) {
        data.auth();
      } else {
        data.send({
          query: val,
          success: res => {
            if (res.list_options && res.options && res.options.length) {
              this.setData({
                guideList: res.options.map(d => {
                  console.log(d);
                  return d.title;
                })
              });
            } else {
              const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
              let list = [];
              if (clicklink.test(res.answer)) {
                res.answer.replace(
                  clicklink,
                  (all, msgmenucontent, msgmenuid) => {
                    list.push(msgmenucontent);
                  }
                );
              }

              this.setData({
                guideList: list.concat(data.getData().guideList)
              });
            }

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
                docs: more_news,
                res: res
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
              let date_slot = { date: new Date() };

              if (res.slots_info) {
                for (var i = 0, len = res.slots_info.length; i < len; i++) {
                  const item = res.slots_info[i];
                  if (item.slot_value) {
                    const v = JSON.parse(item.slot_value);
                    if (v.type === "datetime_point") {
                      date_slot = v;
                    }
                  }
                }
              }

              if (detail != null && detail.length > 0) {
                if (res.dialog_status === "START") {
                  var cardData = {
                    msg_type: "text",
                    content: res.answer,
                    res: res
                  };
                  listData.push(cardData);
                  that.setData(
                    {
                      listData: listData
                    },
                    () => {
                      setTimeout(() => {
                        that.scrollToNew();
                      }, 500)
                      
                    }
                  );
                } else {
                  if (detail.length > 0) {
                    let tempList = detail;
                    for (var i = 0; i < 6; i++) {
                      tempList.push(detail[0]);
                      tempList[i].dateTime = util.dateTimeFormat(
                        date_slot.date
                      );
                      tempList[i].week = util.date2Week(date_slot.date);
                      tempList[i].picture = "qing";
                    }
                    //  tempList[0].dateTime = util.dateTimeFormat(slot_info.date)
                    //  tempList[0].week = util.date2Week(slot_info.date)
                    console.log(tempList);
                    var newData = {
                      answer: res.answer,
                      cardType: "weather",
                      docs: tempList,
                      res: res
                    };
                    listData.push(newData);
                    that.setData(
                      {
                        listData: listData
                      },
                      () => {
                        setTimeout(() => {
                          that.scrollToNew();
                        }, 500)
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
            } else if (/\s*{\s*\"image"\s*:\s*{/.test(res.answer)) {
              newData = {
                cardType: "image",
                data: JSON.parse(res.answer).image,
                res: res,
                query: val
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
            } else if (/\s*{\s*\"news"\s*:\s*{/.test(res.answer)) {
              const tn = JSON.parse(res.answer).news;
              newData = {
                answer: res.msg[0].ans_node_name,
                cardType: "news",
                docs: tn.articles.map(item => {
                  return {
                    shortcut: item.picurl,
                    title: item.title,
                    abs_s: item.description
                  };
                }),
                res: res
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
            } else if (/{.*:\s*[{[]/.test(res.answer)) {
              console.log("kkkkkkkk");
              newData = {
                cardType: "unsupported",
                data: JSON.parse(res.answer),
                res: res
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
              console.log("res", res.answer, typeof res.answer);
              newData = {
                msg_type: "text",
                content: res.answer,
                res: res
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
            // 回调, 返回的数据
            this.triggerEvent("queryCallback", { query: val, data: res });
            wx.setStorageSync('chatRecord', this.data.listData)
            this.setData({
              controlSwiper: true
            });

            if (
              data.getData().textToSpeech &&
              answer_type === "text" &&
              !/{[^}]*}/.test(res.answer)
            ) {
              plugin.textToSpeech({
                lang: "zh_CN",
                tts: true,
                content: res.answer,
                success: res => {
                  // console.log("succ tts", res.filename);
                  // wx.playBackgroundAudio({
                  //   dataUrl: res.filename,
                  //   title: res.answer
                  // });

                  music.pause();
                  music.getBackgroundAudio(
                    () => {},
                    () => {
                      console.log("onEnded");
                    }
                  );

                  backgroundAudioManager.src = res.filename;
                  backgroundAudioManager.title = "voic";
                  backgroundAudioManager.play(() => {});
                },
                fail: function(res) {
                  console.log("fail tts", res);
                }
              });
            }
          }
        });
      }
    },
    // // 输入选择
    // chooseType: function(e) {
    //   if (e.currentTarget.dataset.type == "voice") {
    //     this.setData({
    //       inputing: false
    //     });
    //   } else {
    //     this.setData({
    //       inputing: true
    //     });
    //   }
    // },
    // // 返回首页
    // showGuideView: function() {
    //   this.pauseVoice();
    //   this.triggerEvent("backHome");
    //   //  this.setData({
    //   //    isShowGuideView: true,
    //   //    isShowSwiperView: false
    //   //  })
    //   //  this.animation
    //   //    .translate(0, 0)
    //   //    .scale(1)
    //   //    .step()
    //   //  this.setData({
    //   //    animation: this.animation.export(),
    //   //  })
    // },
    backHome:function () { 
      this.pauseVoice();
      this.triggerEvent("backHome");
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

      try {
        plugin = requirePlugin("WechatSI");
        manager = plugin.getRecordRecognitionManager();
      } catch (e) {
        return e;
      }

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
        var text = res.result;
        console.log("---------------------------------------" + text);
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
          that.scrollToNew();
          this.setData({
            isShowSwiperView: true,
            controlSwiper: false
          });
          that.getData(newData.content);
        }
      );
    }
  }
});
