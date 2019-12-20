function StoreonVue (Vue) {
  Vue.mixin({
    beforeCreate: function () {
      var store = this.$options.store
      var parent = this.$options.parent
      var key = 'state'
      var vm = this

      if (store) {
        this.$storeon = store
      } else if (parent && parent.$storeon) {
        this.$storeon = parent.$storeon
      }

      Vue.util.defineReactive(this.$storeon, key, this.$storeon.get())
      this._subscription = this.$storeon.on('@changed', function (value) {
        vm.$storeon[key] = value
      })
    },
    beforeDestroy: function () {
      if (this._subscription) {
        this._subscription.unsubscribe()
      }
    }
  })
};

module.exports = { StoreonVue: StoreonVue }