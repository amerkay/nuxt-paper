export const state = () => ({
  logoText: 'Test Co.',
})

export const mutations = {
  setLogoText(state, logoText) {
    state.logoText = logoText
  },
}
