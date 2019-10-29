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
      if (app.getData() === '小微写诗') {
        that.setData({
          flag: true
        })
      }
    }
  },
  methods: {}
});
