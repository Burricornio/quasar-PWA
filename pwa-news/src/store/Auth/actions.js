import Vue from 'vue'

export function login ({ commit, state, rootState }, user) {
  return Vue.prototype.$axios.post('login', user)
}

export function register ({ commit, state, rootState }, user) {
  return Vue.prototype.$axios.post('register', user)
}
