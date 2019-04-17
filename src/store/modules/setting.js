import defaultSettings from '@/setting.js'

const { theme } = defaultSettings
const state = {
  theme: theme
}

const mutations = {
  CHANGE_SETTING: (state, value) => {
    state.theme = value
    console.log(state.them)
  }
}

const actions = {
  commitSetLoading ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
