import Vuex from 'vuex'

export const state = () => ({
  authToken: null,
  userInfo : null,
})
export const mutations = {
  SET_AUTH_TOKEN (state, token) {
    state.authToken = token
  },
  SET_USER_INFO (state,info){
    state.userInfo = info
  },
}
export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.auth) {
        commit('SET_AUTH_TOKEN', req.session.auth)
        commit('SET_USER_INFO', req.session.userInfo)
    }
    else{
        commit('SET_AUTH_TOKEN', null)
        commit('SET_USER_INFO', null)
    }
  }
}
 