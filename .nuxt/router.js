import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ebedbd14 = () => interopDefault(import('../pages/chat.vue' /* webpackChunkName: "pages/chat" */))
const _4d19b4dd = () => interopDefault(import('../pages/oficina.vue' /* webpackChunkName: "pages/oficina" */))
const _222be2f8 = () => interopDefault(import('../pages/saladereuniones.vue' /* webpackChunkName: "pages/saladereuniones" */))
const _fdc1993c = () => interopDefault(import('../pages/slack.vue' /* webpackChunkName: "pages/slack" */))
const _519d9c8a = () => interopDefault(import('../pages/auth/signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _5c060e28 = () => interopDefault(import('../pages/auth/signout.vue' /* webpackChunkName: "pages/auth/signout" */))
const _f1115ed4 = () => interopDefault(import('../pages/boards/_id.vue' /* webpackChunkName: "pages/boards/_id" */))
const _2908cba4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chat",
    component: _ebedbd14,
    name: "chat"
  }, {
    path: "/oficina",
    component: _4d19b4dd,
    name: "oficina"
  }, {
    path: "/saladereuniones",
    component: _222be2f8,
    name: "saladereuniones"
  }, {
    path: "/slack",
    component: _fdc1993c,
    name: "slack"
  }, {
    path: "/auth/signin",
    component: _519d9c8a,
    name: "auth-signin"
  }, {
    path: "/auth/signout",
    component: _5c060e28,
    name: "auth-signout"
  }, {
    path: "/boards/:id?",
    component: _f1115ed4,
    name: "boards-id"
  }, {
    path: "/",
    component: _2908cba4,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
