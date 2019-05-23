import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _6e165c4c = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages_login" */))
const _2f534dcb = () => interopDefault(import('..\\pages\\party\\index.vue' /* webpackChunkName: "pages_party_index" */))
const _bf226f24 = () => interopDefault(import('..\\pages\\promotion\\index.vue' /* webpackChunkName: "pages_promotion_index" */))
const _2cf4e62f = () => interopDefault(import('..\\pages\\party\\_id\\index.vue' /* webpackChunkName: "pages_party__id_index" */))
const _0165a27a = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/login",
      component: _6e165c4c,
      name: "login"
    }, {
      path: "/party",
      component: _2f534dcb,
      name: "party"
    }, {
      path: "/promotion",
      component: _bf226f24,
      name: "promotion"
    }, {
      path: "/party/:id",
      component: _2cf4e62f,
      name: "party-id"
    }, {
      path: "/",
      component: _0165a27a,
      name: "index"
    }],

    fallback: false
  })
}
