import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0d3ee4ed = () => interopDefault(import('..\\pages\\concept\\index.vue' /* webpackChunkName: "pages/concept/index" */))
const _59619a29 = () => interopDefault(import('..\\pages\\information\\index.vue' /* webpackChunkName: "pages/information/index" */))
const _cbeb92c0 = () => interopDefault(import('..\\pages\\menu\\index.vue' /* webpackChunkName: "pages/menu/index" */))
const _22d2dca9 = () => interopDefault(import('..\\pages\\shop\\index.vue' /* webpackChunkName: "pages/shop/index" */))
const _649bda5e = () => interopDefault(import('..\\pages\\information\\_id.vue' /* webpackChunkName: "pages/information/_id" */))
const _5cda649f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/concept",
    component: _0d3ee4ed,
    name: "concept"
  }, {
    path: "/information",
    component: _59619a29,
    name: "information"
  }, {
    path: "/menu",
    component: _cbeb92c0,
    name: "menu"
  }, {
    path: "/shop",
    component: _22d2dca9,
    name: "shop"
  }, {
    path: "/information/:id",
    component: _649bda5e,
    name: "information-id"
  }, {
    path: "/",
    component: _5cda649f,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
