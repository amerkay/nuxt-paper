<template>
  <div class="flex justify-center min-h-screen mx-auto text-center">
    <div class="w-1/3">
      <h1 class="my-20 text-6xl font-bold">nuxt-paper</h1>

      <settings-bar />

      <Logo
        :icon="iconList[20]"
        :text="logoText"
        class="bg-gray-100 border border-blue-500"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('current', ['logoText']),
    ...mapState('icons', ['iconList']),
  },
  async asyncData({ params, store, error, payload, query }) {
    await store.dispatch('icons/getIconsForTerms', ['rabbit', 'hat'])
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS *
 .container {
  @apply min-h-screen max-w-screen-md flex justify-center items-center text-center mx-auto;
} */
</style>
