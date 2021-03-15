<template>
  <!-- This is the canvas controlled by Paper.JS -->
  <div class="flex content-center justify-center">
    <canvas width="300" resize id="view" ref="view"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: '-----',
    },
    icon: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      imagePath: '',
      paper: null, // Our Paper instance
    }
  },
  computed: {
    ...mapState('current', ['logoText']),
  },
  mounted() {
    // Create and store the Paper instance in a Vue variable (this.paper)
    this.paper = this.$paper.setup(this.$refs.view)
    this.buildLogo()
  },
  watch: {
    // whenever logoText changes, this function will run
    logoText(newText, oldText) {
      this.buildLogo()
    },
  },
  methods: {
    async buildLogo() {
      // start with clean canvas before building logo
      this.paper.project.clear()

      const radius = 40
      const marginX = 20

      var iconX = Math.round(radius + 1)
      var iconY = Math.round(this.paper.view.size.height / 2)

      var iconPath = new this.paper.Path.Circle({
        center: new this.paper.Point(iconX, iconY),
        radius: radius,
        // strokeColor: new this.paper.Color(1, 0, 0),
      })

      await this.getIcon(this.icon.icon_url).then(() => {
        var icon = this.paper.project.importSVG(this.iconSVG)

        // Fit icon to iconPath
        icon.fitBounds(iconPath.bounds)
      })

      var textX = radius * 2 + marginX
      var textY = iconY - radius

      // Create a rectangle shaped path to the right, to fit the text into.
      var pathText = new this.paper.Path.Rectangle({
        point: [textX, textY],
        size: [this.paper.view.size.width - textX, radius * 2],
      })

      await this.getText(this.logoText, 'fontX').then(() => {
        var text = this.paper.project.importSVG(this.textSVG)
        text.set({
          position: new this.paper.Point(textX + text.bounds.width / 2, iconY),
          strokeWidth: 0,
        })

        // Fit text to pathText if needed
        if (text.bounds.width > pathText.bounds.width)
          text.fitBounds(pathText.bounds)
      })
    },
    async getText(textStr, fontName) {
      const svg = await this.$axios.$get('/text-to-svg?text=' + textStr)
      this.textSVG = svg
    },
    async getIcon(iconUrl) {
      var svg = await this.$axios.$get(iconUrl)
      this.iconSVG = svg
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
