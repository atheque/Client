import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false
  },
  mutations: {
    SET_LOGIN(state) {
      state.isLogin = true
    },
    SET_LOGOUT(state) {
      state.isLogin = false
    }
  },
  actions: {
    
  }
})
