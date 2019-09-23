Component({
  properties: {
    msg: Object
  },

  data: {},
  lifetimes: {
    ready: function () { 
      console.log(this.properties.msg)
    }
  },
  methods: {}
});
