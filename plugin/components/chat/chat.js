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
    welcome: "",
    welcomeVal: false,
    page: 1,
    totalPage: 1,
    pageSize: 20,
    chatReCord: []
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
          that.setData({
            focus: val
          });
        }
      }
    };
  },

  attached: function() {
    music.data.isPlaying = false
    const operateCardHeight = data.getData().operateCardHeight;
    const guideCardHeight = data.getData().guideCardHeight;
    const navHeight = data.getData().navHeight
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        this.setData({
          operateCardHeight: operateCardHeight,
          guideCardHeight: guideCardHeight,
          scrollHeight: res.windowHeight - operateCardHeight - guideCardHeight - navHeight,
        });
      }
    });

    //取第一页
    const chatReCord = wx.getStorageSync("chatRecord");
    const { pageSize, page } = this.data;
    if (chatReCord && chatReCord.length > 0) {
      var totalPage = Math.ceil(chatReCord.length / pageSize);
      const index = chatReCord.length - page * pageSize;
      this.setData({
        listData: chatReCord.slice(index < 0 ? 0 : index),
        totalPage
      });
    }

    if (data.getData().welcome && data.getData().welcome !== "") {
      let newData = {
        content: data.getData().welcome
      };
      this.setData({
        welcome: newData,
        welcomeVal: true,
      });
    } else {
      this.setData({
        welcomeVal: false
      });
    }
    if (data.getData().background) {
      this.setData({
        background: data.getData().background
      });
    }
    this.setData({
      guideList: data.getData().guideList
    });

    this.initRecord();

    data.setChatComponent(this);
  },
  ready: function() {},
  methods: {
    //--------------------------------------------键盘输入-----------------------------------
    // bindInput: function(e) {
    //   this.setData({
    //     inputText: e.detail.value
    //   });
    // },
    scrolltoupper: function(e) {
      // 向上滑动到最顶端时，page+1
      const chatReCord = wx.getStorageSync("chatRecord");
      let { page, pageSize } = this.data;
      if (chatReCord.length === 0) {
        return;
      }
      page += 1;
      console.log(page, chatReCord.length);
      const index = chatReCord.length - page * pageSize;
      const arr = chatReCord.slice(index < 0 ? 0 : index);
     
      this.setData({
        listData: arr,
        page
      }, () => {
        if (music.data.isPlaying && this.data.isPlaying) {
          let listData = this.data.listData
          listData[music.data.cardId].isPlaying = true
          this.setData({
            listData: listData
          })
        }
      });
    },
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
        if (listData[music.data.cardId] && listData[music.data.cardId].isPlaying) {
          listData[music.data.cardId].isPlaying = false
        }
        this.getRecord(newData, data.getData().history, data.getData().historySize)
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
    bindInutvalue: function(e) {
      this.bindconfirmInput(e);
    },
    getRecord:function(newData, history, historySize) {
      if (history) {
        const chatReCord = wx.getStorageSync("chatRecord") || [];
        chatReCord.push(newData);
        if(chatReCord &&chatReCord.length > historySize) {
          chatReCord.shift();
        }
        wx.setStorageSync("chatRecord", chatReCord);
      }
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
      var that = this;
      let listData = that.data.listData;
      var newData = {
        content: val,
        data_type: 1
      };
      listData.push(newData);
      this.getRecord(newData, data.getData().history, data.getData().historySize)
      that.getData(val);
    },
    editFoucs: function(val) {
      if (val) {
        this.setData({
          focus: val
        });
      }
    },
    setWelcome:function(val) {
      let newData = {
        content: val
      };
      this.setData({
        welcome: newData,
        welcomeVal: true,
      });
    },
    setBackground:function(val) {
      this.setData({
        background: val
      })
    },
    clearChatRecord:function(e) {
      backgroundAudioManager.stop()
      wx.removeStorage({
        key: 'chatRecord',
        success (res) {
        }
      })
      this.setData({
        listData: []
      })
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
                  isPlaying: true,
                  docs: JSON.parse(res.more_info.music_ans_detail).play_command
                    .play_list,
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
              } else {
                console.log(
                  JSON.parse(res.more_info.fm_ans_detail).audio_play_command
                    .play_list
                );
                newData = {
                  answer: "",
                  cardType: "voice",
                  isPlaying: true,
                  docs: JSON.parse(res.more_info.fm_ans_detail)
                    .audio_play_command.play_list,
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
              }
            } else if (answer_type === "news") {
              let more_news = JSON.parse(res.more_info.news_ans_detail).data
                .docs;
              newData = {
                answer: res.msg[0].ans_node_name,
                cardType: "news",
                docs: more_news,
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

              if (res.more_info && res.more_info.weather_ans_detail) {
                let weatherArr = {}
                weatherArr = JSON.parse(res.more_info.weather_ans_detail)
                if (weatherArr.data.length > 0) {
                  newData = {
                    answer: res.answer,
                    cardType: "weather",
                    docs: weatherArr,
                    res: res,
                    query: val
                  };
                  listData.push(newData);
                  that.setData(
                    {
                      listData: listData
                    },
                    () => {
                      setTimeout(() => {
                        that.scrollToNew();
                      }, 500);
                    }
                  );
                } 
              } else {
                if (res.dialog_status === "START") {
                  newData = {
                    msg_type: "text",
                    content: res.answer,
                    res: res,
                    query: val
                  };
                  listData.push(newData);
                  that.setData(
                    {
                      listData: listData
                    },
                    () => {
                      setTimeout(() => {
                        that.scrollToNew();
                      }, 500);
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
            } else if (/{.*:\s*[{[]/.test(res.answer)) {
              console.log("kkkkkkkk");
              newData = {
                cardType: "unsupported",
                data: JSON.parse(res.answer),
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
            } else {
              console.log("res", res.answer, typeof res.answer);
              newData = {
                msg_type: "text",
                content: res.answer,
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
            }
            // 回调, 返回的数据
            this.triggerEvent("queryCallback", { query: val, data: res });

            if (newData && newData.isPlaying) {
              newData.isPlaying = false
            }

            this.getRecord(newData, data.getData().history, data.getData().historySize)

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
                  let voiceData = {
                    url: res.filename,
                    name: 'voic'
                  }
                  music.data.voiceData = voiceData
                  music.play((isPlaying)=>{
                    that.setData({
                      isPlaying:  false
                    })
                  })
                  // backgroundAudioManager.src = res.filename;
                  // backgroundAudioManager.title = "voic";
                  // backgroundAudioManager.play(() => {});
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
    backHome: function() {
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
      if (listData[music.data.cardId] && listData[music.data.cardId].isPlaying) {
        listData[music.data.cardId].isPlaying = false
      }
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
          
          this.getRecord(newData, data.getData().history, data.getData().historySize)
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
      this.getRecord(newData, data.getData().history, data.getData().historySize)
      if (listData[music.data.cardId] && listData[music.data.cardId].isPlaying) {
        listData[music.data.cardId].isPlaying = false
      }
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
    },
    changeCardMId:function (e) { 
      let listData = this.data.listData
      listData[e.detail.cardId].isPlaying = e.detail.flag
      this.setData({
        listData: listData,
        isPlaying: true
      })
    }
  }
});
