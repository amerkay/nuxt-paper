export const state = () => ({
  list: [],
})

export const mutations = {
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  //   remove(state, { todo }) {
  //     state.list.splice(state.list.indexOf(todo), 1)
  //   },
  //   toggle(state, todo) {
  //     todo.done = !todo.done
  //   },
}

export const actions = {
  async loadBlogSettings({ commit, state, dispatch }) {
    // check if already loaded in state, and exit before call
    if (state.blogSettings) {
      return
    }

    // await dispatch('loadGhost')

    const settings = await ghost.ghostAPI().settings.browse()
    commit('setBlogSettings', settings)
  },
}
