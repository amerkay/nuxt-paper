export const state = () => ({
  logoName: 'Test Co.',
})

export const mutations = {
  setLogoName(state, logoName) {
    state.logoName = logoName
  },
}
