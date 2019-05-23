import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '..\\node_modules\\bootstrap\\dist\\css\\bootstrap.css'

import '..\\node_modules\\bootstrap-vue\\dist\\bootstrap-vue.css'

import '..\\static\\fonts\\helvetica\\style.css'

import _6f6c098b from '..\\layouts\\default.vue'

const layouts = { "_default": _6f6c098b }

export default {
  head: {"title":"NewMeet","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],"script":[{"src":"\u002Fassets\u002Fplugins\u002Fpace\u002Fpace.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery\u002Fjquery-1.11.3.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fbootstrapv3\u002Fjs\u002Fbootstrap.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-block-ui\u002Fjqueryblockui.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-unveil\u002Fjquery.unveil.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-scrollbar\u002Fjquery.scrollbar.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-numberAnimate\u002Fjquery.animateNumbers.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-validation\u002Fjs\u002Fjquery.validate.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fbootstrap-select2\u002Fselect2.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-notifications\u002Fjs\u002Fmessenger.min.js"},{"src":"\u002Fassets\u002Fplugins\u002Fjquery-notifications\u002Fjs\u002Fmessenger-theme-flat.js"},{"src":"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002FSwiper\u002F4.4.5\u002Fjs\u002Fswiper.min.js"}],"link":[{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto"}],"style":[]},

  render(h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter(el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    isOnline: true,
    layout: null,
    layoutName: ''
  }),
  beforeCreate() {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created() {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this
      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },

  mounted() {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline() {
      return !this.isOnline
    }
  },
  methods: {
    refreshOnlineStatus() {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    errorChanged() {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },

    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },
  components: {
    NuxtLoading
  }
}
