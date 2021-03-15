export const state = () => ({
  iconList: [],
})

export const mutations = {
  setIconsList(state, iconsList) {
    state.iconList = iconsList
  },
}

export const actions = {
  async getIconsForTerms({ commit }, terms) {
    console.log('/noun?terms=' + terms.join(','))
    const iconsList = await this.$axios.$get('/noun?terms=' + terms.join(','))

    // console.log(iconsList)
    commit('setIconsList', iconsList)
  },
}
