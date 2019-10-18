# 微信对话开放平台小程序插件


[微信对话开放平台](http://openai.weixin.qq.com)是以对话交互为核心, 为有客服需求的个人、企业和组织提供智能业务服务与用户管理能力的技能配置平台,
技能开发者可利用我们提供的工具自主完成客服机器人的搭建。此小程序插件为小程序开发者提供快速对接微信AI语意的能力。


![链接](./show1.png)
![链接](./show2.png)

> 微信对话开放平台小程序插件，提供两种调用方式，一种是有UI组件式调用，另一种是无UI
功能接口调用。


## 1.插件配置


> 请在 [微信对话开放平台](https://openai.weixin.qq.com) 上获得插件所需appid

在小程序 `app.json` 中 配置, 小程序插件id是 `wx8c631f7e9f2465e1`, 请使用最新稳定版本

```js
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": {
    "chatbot": {
      "version": "1.1.0",
      "provider": "wx8c631f7e9f2465e1"
    }
  },
  "requiredBackgroundModes": [
    "audio"
  ],
  "sitemapLocation": "sitemap.json"
}
```

> 当使用有UI版本时，需要额外使用WechatSI组件, 只使用接口不使用UI时，使用上面的配置就可以了

```
{
  "pages": [
    "pages/index/index",
    "pages/newsPage/newsPage",
    "pages/common/common"
  ],
  "plugins": {
    "myPlugin": {
      "version": "1.1.0",
      "provider": "wx8c631f7e9f2465e1"
    },
    "WechatSI": {
      "version": "0.3.1",
      "provider": "wx069ba97219f66d99"
    }
  },
  "requiredBackgroundModes": ["audio"],
  "sitemapLocation": "sitemap.json"
}

```




## 2. 无UI(只获取NLU结果), 直接调用插件接口

> 代码中所示appid：`P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja` 为示例账户，正式产品内使用请到
> [微信对话开放平台](https://openai.weixin.qq.com) 申请账户，然后到
> [设置-服务接入](https://openai.weixin.qq.com/) 查看对应的小程序ID
> ![a](./appid.png)

### 2.1 组件初始化

```js

var plugin = requirePlugin("chatbot");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
        appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja", //小程序示例账户，仅供学习和参考
        openid: "",//用户的openid，非必填，建议传递该参数
        success: () => {}, //非必填
        fail: error => {} //非必填
    });
  }
});


```

### 2.2 发送query


```js

plugin.send({
  query: "你好",
  success: res => {
    console.log(res);
  },
  fail: error => {}
});

```


### 2.3 动态设置guideList


>从版本 1.1.0 开始，支持根据上下文,随时修改用户提示语的方法

```
    plugin.setGuideList(['内容', '内容'])
```


### 2.4 动态设置textToSpeech


>从版本 1.1.0 开始，支持根据上下文,随时修改是否打开语音播报

```
    plugin.setTextToSpeech(false)
```

### 2.5 动态设置欢迎语


>从版本 1.1.0 开始，支持动态修改欢迎语

```
    plugin.setWelcome("您好，请问需要什么帮助？")
```

### 2.6 动态设置聊天背景


>从版本 1.1.0 开始，支持动态设置聊天背景

```
    plugin.setBackground("rgba(247,251,252,1)")
```

### 2.7 动态控制UI组件，发送消息、开始录音、结束录音


>从版本 1.1.0 开始，支持获取对话UI组件, 获取ui组件后可以访问到
`inputVoiceStart`、 `inputVoiceEnd` 、`send` 三个UI方法
```
    const chat = plugin.getChatComponent();


    //用户需要开始语音输入的时候需要触发的事件
    chat.inputVoiceStart();

    //用户需要结束语音输入的时候需要触发的事件
    chat.inputVoiceEnd();

    //用户需要发送消息时需要触发的事件
    chat.send("你好！");
```






### 2.5 NLU结果

```json
{
  "ans_node_id": 6666,
  "ans_node_name": "天气服务",
  "answer": "北京今天小雨，温度18到29度，当前温度27度，空气质量轻度污染，今天有雨，略微偏热，注意衣物变化。",
  "answer_open": 1,
  "answer_type": "text",
  "article": "",
  "bid_stat": {
    "curr_time": "20190826-16:34:56",
    "err_msg": "",
    "latest_time": "20190826-16:34:56",
    "latest_valid": true,
    "up_ret": 0
  },
  "confidence": 1,
  "create_time": "1566810973035",
  "dialog_status": "COMPLETE",
  "from_user_name": "o9U-85tEZToQxIF8ht6o-KkagxO0",
  "intent_confirm_status": "",
  "list_options": false,
  "msg": [
    {
      "ans_node_id": 6666,
      "ans_node_name": "天气服务",
      "article": "",
      "confidence": 1,
      "content": "北京今天小雨，温度18到29度，当前温度27度，空气质量轻度污染，今天有雨，略微偏热，注意衣物变化。",
      "debug_info": "",
      "list_options": false,
      "msg_type": "text",
      "resp_title": "天气服务",
      "status": "CONTEXT_FAQ"
    }
  ],
  "ret": 0,
  "skill_id": "",
  "skill_type": "",
  "slot_info": [
    {
      "date": "{\"type\":\"DT_ORI\",\"date_ori\":\"今天\",\"date\":\"2019-08-26\",\"date_lunar\":\"2019-08-26\",\"week\":\"1\",\"slot_content_type\":\"2\",\"modify_times\":\"0\"}"
    },
    {
      "from_loc": "{\"type\":\"LOC_CHINA_CITY\",\"country\":\"中国\",\"city\":\"北京\",\"city_simple\":\"北京\",\"loc_ori\":\"北京\",\"slot_content_type\":\"2\",\"modify_times\":\"1\"}"
    }
  ],
  "slots_info": [
    {
      "confirm_status": "NONE",
      "end": 0,
      "entity_type": "",
      "norm": "2019-08-26",
      "norm_detail": "",
      "slot_name": "date",
      "slot_value": "{\"type\":\"DT_ORI\",\"date_ori\":\"今天\",\"date\":\"2019-08-26\",\"date_lunar\":\"2019-08-26\",\"week\":\"1\",\"slot_content_type\":\"2\",\"modify_times\":\"0\"}",
      "start": 0
    },
    {
      "confirm_status": "NONE",
      "end": 6,
      "entity_type": "LOC_CHINA_CITY",
      "norm": "{\"type\":\"LOC_CHINA_CITY\",\"country\":\"中国\",\"city\":\"北京\",\"city_simple\":\"北京\",\"loc_ori\":\"北京\"}",
      "norm_detail": "",
      "slot_name": "from_loc",
      "slot_value": "{\"type\":\"LOC_CHINA_CITY\",\"country\":\"中国\",\"city\":\"北京\",\"city_simple\":\"北京\",\"loc_ori\":\"北京\",\"slot_content_type\":\"2\",\"modify_times\":\"1\"}",
      "start": 0
    }
  ],
  "status": "CONTEXT_FAQ",
  "title": "天气服务",
  "to_user_name": "10808"
}
```


## 3.有UI，直接使用标记组件，无需接口调用


> 代码中所示appid：`P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja` 为示例账户，正式产品内使用请到
> [微信对话开放平台](https://openai.weixin.qq.com) 申请账户，然后到
> [设置-服务接入](https://openai.weixin.qq.com/) 查看对应的小程序ID
> ![a](./appid.png)



### 3.1 组件初始化


```js

var plugin = requirePlugin("chatbot");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja", //小程序示例账户，仅供学习和参考
      openid: "", //小程序用户openid，非必填
      success: () => {},
      fail: error => {}
    });
  }
});

```

### 3.2 在组件内进行配置

在页面的配置json内进行配置，比如 `pages/index/index.json`


```
{
  "usingComponents": {
    "chat": "plugin://chatbot/chat"
  }
}
```


### 3.3. 使用组件


> chat组件外部必须指定容器, 并设置容器高度, 如果全屏展示, 设置高度为100vh, 如果是自定义导航栏, 设置高度为(100vh - 导航栏的高度)即可.


```html
<!-- 自定义导航 -->
<view style="height: 100vh;">
  <view class='nav-wrap' style='height: 100px;'>
    <view class='nav-title' style='line-height: 100px'>自定义导航</view>
  </view>
  <view style="height: calc(100vh - 100px)">
    <chat  bind:backHome="goBackHome" />
  </view>
</view>

```
```html
<!-- 系统导航 -->
<view style="height: 100vh">
    <chat bind:backHome="goBackHome" />
</view>

```

```js
  // goBackHome回调 返回上一级页面
  goBackHome: function () {
    wx.navigateBack({
      delta: 1
    })
  }
```


#### 3.3.1. 每次返回结构后，触发`queryCallback`


> chat组件外部必须指定容器, 并设置容器高度, 如果全屏展示, 设置高度为100vh, 如果是自定义导航栏, 设置高度为(100vh - 导航栏的高度)即可.

```html
<view style="height: 100vh">
    <chat bind:queryCallback="getQueryCallback" bind:backHome="goBackHome" />
</view>

```

```js
  // getQueryCallback回调 返回query与结果
  getQueryCallback: function (e) {
    console.log(e.detail);
  },
  // goBackHome回调 返回上一级页面
  goBackHome: function () {
    wx.navigateBack({
      delta: 1
    })
  }
```

## 4 消息组件重写(自定义插件内容的样式)

从版本1.0.7开始支持对小程序内置插件的替换，包括文本消息，天气消息，图片消息，音乐消息，新闻消息和引导消息
从版本1.1.0开始支持`generic:operateCard` 参数，底部文字和语音输入增加 `customoperateCard` 自定义复写的功能


```html
<view style="height: 100vh">
   <chat bind:queryCallback="getQueryCallback" bind:backHome="goBackHome"
      generic:queryMessage="queryMessage"
      generic:textMessage="customTextMessage"
      generic:weatherMessage="customWeatherMessage"
      generic:imageMessage="customImageMessage"
      generic:musicMessage="customMusicMessage"
      generic:newsMessage="customNewsMessage"
      generic:unsupportedMessage="customUnsupportedMessage"
      generic:guideCard="customGuideCard"
      generic:operateCard="customoperateCard"
      >
   </chat>
</view>
```

```json
{
  "usingComponents": {
    "chat": "plugin://myPlugin/chat",
    "customQueryMessage": "../customQueryMessage/customQueryMessage",
    "customTextMessage": "../customTextMessage/customTextMessage",
    "customWeatherMessage": "../customWeatherMessage/customWeatherMessage",
    "customImageMessage": "../customImageMessage/customImageMessage",
    "customMusicMessage": "../customMusicMessage/customMusicMessage",
    "customNewsMessage": "../customNewsMessage/customNewsMessage",
    "customUnsupportedMessage": "../customUnsupportedMessage/customUnsupportedMessage",
    "customGuideCard": "../customGuideCard/customGuideCard",
    "customOperateCard": "../customOperateCard/customOperateCard"
  }
}
```

### 4.1支持覆盖的组件类别：

1. queryMessage: 用户发出的消息
2. textMessage: 文本类消息
3. weatherMessage: 天气类消息
4. imageMessage: 图片类消息
5. musicMessage: 音乐类消息
6. newsMessage: 新闻类消息
7. unsupportedMessage: 暂未支持类消息
8. guideCard: 引导消息
9. operateCard: 底部操作区域(从版本1.1.0开始支持)

> 以上七种消息中，组件 `1-7` 会在组件上收到一个properties参数 `msg`

```js
    <queryMessage msg="{{item}}" recording="{{recording}}"></queryMessage>
    <textMessage msg="{{item}}"></textMessage>
    <weatherMessage msg="{{item}}"></weatherMessage>
    <newsMessage   msg="{{item}}"></newsMessage>
    <musicMessage  msg="{{item}}"></musicMessage>
    <imageMessage  msg="{{item}}"></imageMessage>
    <unsupportedMessage msg="{{item}}"></unsupportedMessage>
    <guideCard guideList="{{guideList}}" controlSwiper="{{controlSwiper}}" bind:chooseGuide="choosePageGuide"> </guideCard>
    <operateCard bind:bindInput="bindInutvalue" bind:inputVoiceStart="inputVoiceStart" bind:inputVoiceEnd="inputVoiceEnd" bind:back="backHome" focus="{{focus}}" ></operateCard>
```

#### 4.1.1 `queryMessage` 的 properties 参数 msg的数据结构：

```json

  {
    content: "用户输入的对话内容",
  };

```

properties 说明:


```json
  properties: {
    msg: Object,
    recording: Boolean
  }

```

字段|类型|描述
--|--|--|--|--
msg|Object|| 自定义提示语
recording|Boolean|用户按住语音按钮，开始输入时为true，松开时结束语音输入时为false




#### 4.1.2 `textMessage` 的 properties 参数 msg的数据结构：

```json

  {
    msg_type: "text",
    content: "机器人对话结果",
    res: res //NLU结果
  };

```

#### 4.1.3 `weatherMessage` 的 properties 参数 msg的数据结构：

```json

  {
    cardType: "weather",
    answer: "机器人对话结果",
    docs: Array, //天气结果
    res: res //NLU结果
  };

```


#### 4.1.4 `newsMessage` 的 properties 参数 msg的数据结构：

```json

  {
    cardType: "news",
    answer: "机器人对话结果",
    docs: Array, //新闻结果
    res: res //NLU结果
  };

```

#### 4.1.5 `musicMessage` 的 properties 参数 msg的数据结构：

```json

  {
    cardType: "voice",
    answer: "",
    docs: Array, //音乐结果
  };

```

#### 4.1.6 `imageMessage` 的 properties 参数 msg的数据结构：


```json

  {
    cardType: "image",
    data: Object,
    res: res //NLU结果
  };

```


#### 4.1.7 `unsupportedMessage` 的 properties 参数 msg的数据结构：


```json

  {
    cardType: "unsupported",
    data: Object,//自定义的JSON结构
    res: res //NLU结果
  };

```





### 4.2 guideCard 的properties参数

```js

    <guideCard guideList="{{guideList}}" controlSwiper="{{controlSwiper}}"></guideCard>

```


properties 说明:

字段|类型|描述
--|--|--|--|--
guideList|Array|[ "北京天气怎么样", "上海今天有雨吗", "中午吃啥呢", "你知道如何排解压力吗", "法国国土面积是多少", "世界最高峰" ] | 自定义提示语
controlSwiper|Boolean|用来通知用户引导模块是否应当响应用户点击事件，防止误触发生
bind:chooseGuide|Event|当用户点击菜单内选项时，通知机器人用户点击的菜单内容


如果响应用户点击事件
```
   this.triggerEvent("chooseGuide", "用户点击了菜单的什么内容");
```


### 4.3 operateCard 的properties参数

```js
    <operateCard bind:bindInput="bindInutvalue"
                 bind:inputVoiceStart="inputVoiceStart"
                 bind:inputVoiceEnd="inputVoiceEnd"
                 bind:back="backHome"
                 focus="{{focus}}" ></operateCard>
```


properties 说明:

字段|类型|描述
--|--|--|--|--
bind:bindInput|Event|用户需要发送消息时需要触发的事件
bind:inputVoiceStart|Event|用户需要开始语音输入的时候需要触发的事件
bind:inputVoiceEnd|Event|用户需要结束语音输入的时候需要触发的事件
bind:backHome|Event|用户需要返回首页时需要触发的事件
focus|Boolean|输入框是否获得焦点


响应用发送消息事件
```
   this.triggerEvent("bindInput", "用户要发送的消息");
```
用户按住某一个按钮，需要触发开始录音的事件
```
   this.triggerEvent("inputVoiceStart");
```

用户送开某一个按钮，需要触发结束录音的事件
```
   this.triggerEvent("inputVoiceEnd");
```

用户点击某一个按钮，需要触发返回首页的事件
```
   this.triggerEvent("inputVoiceEnd");
```
> 发送消息、开启录音、结束录音、也可以通过 `plugin.getChatComponent()` 方法获取到UI最后，
通过组件方法来实现




```js
    const chat = plugin.getChatComponent();

    //用户需要开始语音输入的时候需要触发的事件
    chat.inputVoiceStart();

    //用户需要结束语音输入的时候需要触发的事件
    chat.inputVoiceEnd();

    //用户需要发送消息时需要触发的事件
    chat.send("你好！");
```




## 5. 初始化配置项

```js
    plugin.init({
      appid: "P5Ot9PHJDechCYqDFAW1AiK6OtG3Ja",
      success: () => {},
      fail: error => {},
      guideList: ["您好"],
      textToSpeech: true, //默认为ture打开状态
      welcome: "请问有什么需要帮助？"
      background: "rgba(247,251,252,1)",
      guideCardHeight: 40,
      operateCardHeight: 145,
      history: true,
      historySize: 60
    });
```


options 说明:

字段|类型|是否必填|默认值|描述
--|--|--|--|--
appid|string|是||微信对话开发平台申请的插件id
openid|string|否||微信小程序用户的opened
success|function|否||初始化成功的回调
fail|function|否||初始化失败的回调
guideList|Array|否|[ "北京天气怎么样", "上海今天有雨吗", "中午吃啥呢", "你知道如何排解压力吗", "法国国土面积是多少", "世界最高峰" ] | 自定义提示语
textToSpeech|Array|否|true|在有UI模式下，将文本回答朗读出来
welcome|string|否||用户欢迎语
background|string|否|"rgba(247, 251, 252, 1)"|聊天背景的style
guideCardHeight|number|否|40|用户提示区域的高度
operateCardHeight|number|否|145|用户操作区域的高度
history|Boolean|否|true|是否开启聊天记录
historySize|number|否|60|聊天记录的最大条数




## 6. 接入示例：
![demo](./demo.jpg)
