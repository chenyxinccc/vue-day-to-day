import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    loading: true
  },
  mutations: {
    setLoading (state, status) {
      state.loading = status
    }
  },
  actions: {
    commitSetLoading (content, status) {
      content.commit('setLoading', status)
    }
  }
})

export default store
