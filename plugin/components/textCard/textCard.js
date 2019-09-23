Component({
  properties: {
    msg: Object
  },

  data: {
    answer: "",
    list: []
  },
  lifetimes: {
    ready: function() {
      const clicklink = /<a.*href=["']weixin:\/\/bizmsgmenu.*msgmenucontent=([^&"'>]*).*msgmenuid=([^&"'>]*)["']>.*<\/a>/g;
      const content = this.properties.msg.content;
      console.log("content", content);

      if (clicklink.test(content)) {
        let answer = content.replace(clicklink, "");
        let list = [];

        content.replace(clicklink, (all, msgmenucontent, msgmenuid) => {
          list.push({
            all: all,
            content: msgmenucontent,
            id: msgmenuid
          });
        });

        this.setData({
          answer,
          list
        });
      }
      console.log(this.properties.msg, "---weather---");
    }
  },
  methods: {
    tap() {
      console.log("tap");
    }
  }
});
