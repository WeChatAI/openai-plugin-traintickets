# 微信对话开放平台小程序插件


[微信对话开放平台](http://openai.weixin.qq.com)是以对话交互为核心, 为有客服需求的个人、企业和组织提供智能业务服务与用户管理能力的技能配置平台,
技能开发者可利用我们提供的工具自主完成客服机器人的搭建。此小程序插件为小程序开发者提供快速对接微信AI语意的能力。


![链接](./show1.png)
![链接](./show2.png)

> 微信对话开放平台小程序插件，提供两种调用方式，一种是有UI组件式调用，另一种是无UI
功能接口调用。


## 1.插件配置

在小程序 `app.json` 中 配置, 小程序插件id是 `wx8c631f7e9f2465e1`, 当前稳定版本是1.0

```js
{
  "pages": [
    "pages/index/index"
  ],
  "plugins": {
    "chatbot": {
      "version": "1.0",
      "provider": "wx8c631f7e9f2465e1"
    }
  },
  "requiredBackgroundModes": [
    "audio"
  ],
  "sitemapLocation": "sitemap.json"
}
```


## 2. 无UI, 直接调用插件接口


请在 openai.weixin.qq.com 上获得插件所需appid


### 2.1 组件初始化

```js

var plugin = requirePlugin("chatbot");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7",
      success: () => {},
      fail: error => {}
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


### 2.3 返回结果

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


请在 openai.weixin.qq.com 上获得插件所需appid


### 3.1 组件初始化


```js

var plugin = requirePlugin("chatbot");

App({
  onLaunch: function() {
    console.log(plugin, "+++");
    plugin.init({
      appid: "PWj9xdSdGU3PPnqUUrTf7uGgQ9Jvn7",
      success: () => {},
      fail: error => {}
    });
  }
});

```


### 3.2 在小程序页面内配置导航链接


在页面中直接使用组件标签，比如 `pages/index/index.wxml`


```html
<navigator id="nav" url="plugin://chatbot/chat-page">
    我要对话
</navigator>

```
