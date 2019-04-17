const state = {
  loading: true
}

const mutations = {
  SETLOADING (state, status) {
    state.loading = status
  }
}

const actions = {
  commitSetLoading ({ commit }, data) {
    commit('SETLOADING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
