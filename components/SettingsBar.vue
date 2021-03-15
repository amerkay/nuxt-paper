<template>
  <div>
    <label for="email" class="block text-lg font-medium text-gray-700">
      Enter Logo Text
    </label>
    <div class="mt-1 mb-20">
      <input
        type="text"
        name="email"
        id="email"
        class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Laith Co."
        :value="logoText"
        @input="updateLogoText"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      imagePath: '',
    }
  },
  computed: {
    ...mapState('current', ['logoText']),
  },
  mounted() {},
  methods: {
    updateLogoText(e) {
      this.$store.commit('current/setLogoText', e.target.value)
    },
  },
}
</script>

<style>
/* .NuxtLogo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
} */
</style>
