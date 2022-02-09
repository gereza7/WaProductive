import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _267c3136 = () => interopDefault(import('../pages/chat.vue' /* webpackChunkName: "pages/chat" */))
const _7eef8d1d = () => interopDefault(import('../pages/oficina.vue' /* webpackChunkName: "pages/oficina" */))
const _7dc57b38 = () => interopDefault(import('../pages/saladereuniones.vue' /* webpackChunkName: "pages/saladereuniones" */))
const _730e1ba2 = () => interopDefault(import('../pages/slack.vue' /* webpackChunkName: "pages/slack" */))
const _043e2c0a = () => interopDefault(import('../pages/auth/signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _0b4d5de8 = () => interopDefault(import('../pages/auth/signout.vue' /* webpackChunkName: "pages/auth/signout" */))
const _2860df54 = () => interopDefault(import('../pages/boards/_id.vue' /* webpackChunkName: "pages/boards/_id" */))
const _1af7b3e4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _267c3136,
    name: "chat"
  }, {
    path: "/oficina",
    component: _7eef8d1d,
    name: "oficina"
  }, {
    path: "/saladereuniones",
    component: _7dc57b38,
    name: "saladereuniones"
  }, {
    path: "/slack",
    component: _730e1ba2,
    name: "slack"
  }, {
    path: "/auth/signin",
    component: _043e2c0a,
    name: "auth-signin"
  }, {
    path: "/auth/signout",
    component: _0b4d5de8,
    name: "auth-signout"
  }, {
    path: "/boards/:id?",
    component: _2860df54,
    name: "boards-id"
  }, {
    path: "/",
    component: _1af7b3e4,
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
