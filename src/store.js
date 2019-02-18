import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    count: 2333
  },
  mutations: {
    addCount (state) {
      state.count++
    },
    delCount (state) {
      state.count--
    }
  },
  actions: {
    add (content) {
      content.commit('addCount')
    },
    del (content) {
      content.commit('delCount')
    }
  }
})

export default store
