const app = getApp()
Component({
  properties: {
    msg: Object,
    recording: Boolean
  },

  data: {},
  lifetimes: {
    ready: function () {
      let that = this
      console.log(app.getData())
      // if (app.getData() === '小微写诗') {
      //   if (that.properties.msg.content === '小微写诗') {
      //     that.setData({
      //       flag: false
      //     })
      //   } else {
      //     that.setData({
      //       flag: true
      //     }, () => {
      //       var query = that.createSelectorQuery();
      //       //选择id
      //       query.select('#content').boundingClientRect()
      //       query.selectViewport().scrollOffset()
      //       query.exec(function(res) {
      //         that.setData({
      //           height: res[0].height,
      //           width: res[0].width
      //         })
      //         console.log(that.data.height)
      //         console.log(that.data.width)
      //       });
      //     })
      //   }
      // }
    }
  },
  methods: {}
});
