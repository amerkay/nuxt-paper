export const state = () => ({
  logoList: [],
})

export const mutations = {
  addLogoToList(state, logoObj) {
    console.log('Adding to logoList', logoObj)
    state.logoList.push(logoObj)
  },
}

export const actions = {
  generateMore({ commit, rootState, state }, howMany) {
    const stopAt = state.logoList.length + howMany
    var iconList = rootState.icons.iconList
    console.log('stopAt', stopAt, 'iconList.length', iconList.length)

    while (state.logoList.length < stopAt) {
      console.log(
        'state.logoList.length',
        state.logoList.length,
        'stopAt',
        stopAt
      )
      const randomIconPosition = getRandomInt(iconList.length) - 1
      const icon = iconList[randomIconPosition]

      const id = `id-${icon.id}`
      commit('addLogoToList', {
        id: id,
        icon: icon,
      })
    }
  },
}

// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
