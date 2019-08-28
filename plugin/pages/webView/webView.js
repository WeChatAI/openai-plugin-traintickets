Page({
  data: {
    url: ''
  },
  onLoad: function (options) {
    console.log(options.url)
    this.setData({
      url: options.url.replace('http:', 'https:')
    })
  },
})