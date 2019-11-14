var plugin = requirePlugin("myPlugin");
Component({
    properties: {
        msg: Object
    },
    data: {
        answer: "",
        list: [],
        isRich: false,
        showSlot: false,
        showFromLocation: false,
        showToLocation: false,
        candidates: [],
        fromArray: ['北京', '上海', '广州', '深圳'],
        toArray: ['杭州', '天津', '西安', '成都'],
        fromValue: '',
        toValue: '',
        fromIndex: -1,
        toIndex: -1,
        disabled: false
    },
    lifetimes: {
        ready: function () {
            console.log('msg', this.properties.msg);
            var showSlotTmp = false;
            var candidates = [];
            var showFromLocationTmp = false;
            var showToLocationTmp = false;
            let chat = plugin.getChatComponent();
            if (!!this.properties.msg.res.slots_info) {
                var firstSlotInfo = this.properties.msg.res.slots_info[0];
               if (!!firstSlotInfo) {
                  let fSlotName = firstSlotInfo['slot_name']
                  let fSlotValue = firstSlotInfo['slot_value'].split(':')[0]
                  if(fSlotName == '_call_back_' && fSlotValue == 'SlotAsk'){
                    let secondSlotInfo = this.properties.msg.res.slots_info[1]
                     if ((secondSlotInfo.slot_name == '_stoask_') && (secondSlotInfo.slot_value == '目的地')) {
                        showToLocationTmp = true;
                    }
                    else if ((secondSlotInfo.slot_name == '_stoask_') && (secondSlotInfo.slot_value == '出发地')) {
                        showFromLocationTmp = true;
                    } 
                    if(/^已为您预/.test(this.properties.msg.content)){
                        showToLocationTmp = false;
                        showFromLocationTmp = false;
                    }
                      
                  } else if(fSlotName == '_call_back_' && fSlotValue == 'DynamicListSelection'){
                    let secondSlotInfo = this.properties.msg.res.slots_info[1]
                    var tmp = JSON.parse(secondSlotInfo['slot_value']);
                    candidates = tmp.data_list_candidates;
                    showSlotTmp = !!candidates.length;
                  } else {
                      if(/^已为您预/.test(this.properties.msg.content)){
                          showToLocationTmp = false;
                          showFromLocationTmp = false;
                      }
                  }
                }
            } 
            var facejson = {
                qqface: [
                    "微笑", "撇嘴", "色", "发呆", "得意", "流泪", "害羞", "闭嘴", "睡", "大哭", "尴尬", "发怒", "调皮", "呲牙", "惊讶", "难过", "酷", "冷汗", "抓狂", "吐", "偷笑", "愉快", "白眼", "傲慢", "饥饿", "困", "惊恐", "流汗", "憨笑", "悠闲", "奋斗", "咒骂", "疑问", "嘘", "晕", "疯了", "衰", "骷髅", "敲打", "再见", "擦汗", "抠鼻", "鼓掌", "糗大了", "坏笑", "左哼哼", "右哼哼", "哈欠", "鄙视", "委屈", "快哭了", "阴险", "亲亲", "吓", "可怜", "菜刀", "西瓜", "啤酒", "篮球", "乒乓", "咖啡", "饭", "猪头", "玫瑰", "凋谢", "嘴唇", "爱心", "心碎", "蛋糕", "闪电", "炸弹", "刀", "足球", "瓢虫", "便便", "月亮", "太阳", "礼物", "拥抱", "强", "弱", "握手", "胜利", "抱拳", "勾引", "拳头", "差劲", "爱你", "NO", "OK", "爱情", "飞吻", "跳跳", "发抖", "怄火", "转圈", "磕头", "回头", "跳绳", "投降", "激动", "乱舞", "献吻", "左太极", "右太极"
                ]
            };
            var content = this.properties.msg.content || "";
            var that = this;
            if (/\[([^\]]*)\]/.test(content)) {
                content = content.replace(/\[([^\]]*)\]/g, function (txt, match) {
                    var index = facejson.qqface.indexOf(match);
                    if (index > -1) {
                        return ('<span class="ai-qqemoji" style="background-position: ' +
                            that.getFacePosition(index) +
                            '">' +
                            match +
                            "</span>");
                    }
                    return txt;
                });
            }
            let isRich = false
            if (/<a.*>|<span.*>/.test(content)) {
                isRich = true
            }
            this.setData({
                isRich: isRich,
                answer: content,
                showSlot: showSlotTmp,
                candidates: candidates,
                showToLocation: showToLocationTmp,
                showFromLocation: showFromLocationTmp
            });
        }
    },
    methods: {
        getFacePosition: function (index) {
            var row = 15;
            var width = 24;
            var height = 24;
            var y = Math.floor(index / row);
            var x = index - y * row;
            return -(x * width) + "px " + -(y * height) + "px";
        },
        tap: function () {
            console.log("tap");
        },
        sendMsg: function (event) {
            if(this.data.disabled) return
            var index = event.currentTarget.dataset.index;
            var chat = plugin.getChatComponent();
            chat.send(index + 1, {
                silence: true
            });
            this.setData({
                disabled: true
            })
        },
        bindFromPickerChange: function (e) {
            var chat = plugin.getChatComponent();
            chat.send(this.data.fromArray[e.detail.value]);
            this.setData({
                fromIndex: e.detail.value
            });
        },
        bindToPickerChange: function (e) {
            var chat = plugin.getChatComponent();
            chat.send(this.data.toArray[e.detail.value]);
            this.setData({
                toIndex: e.detail.value
            });
        },
    }
});
