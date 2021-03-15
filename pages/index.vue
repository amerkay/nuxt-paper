<template>
  <div class="flex justify-center min-h-screen mx-auto text-center">
    <div class="w-full p-5 mb-20 md:max-w-md">
      <h1 class="my-10 text-6xl font-bold">nuxt-paper</h1>

      <settings-bar />

      <Logo
        v-for="logo in logoList"
        :key="logo.id"
        :logo-id="logo.id"
        :icon-url="logo.icon.icon_url"
        :text="logoText"
        class="my-5 bg-gray-100 border border-blue-500"
      />

      <button
        @click="getMoreLogos()"
        type="button"
        class="inline-flex items-center px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        MORE!
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('current', ['logoText']),
    ...mapState('icons', ['iconList']),
    ...mapState('logogen', ['logoList']),
  },
  async mounted() {
    await this.$store.dispatch('icons/getIconsForTerms', ['rabbit', 'hat'])
    await this.$store.dispatch('logogen/generateMore', 2)
  },
  methods: {
    getMoreLogos() {
      this.$store.dispatch('logogen/generateMore', 4)
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS *
 .container {
  @apply min-h-screen max-w-screen-md flex justify-center items-center text-center mx-auto;
} */
</style>
