<template>
  <!-- This is the canvas controlled by Paper.JS -->
  <div class="flex justify-center content-center">
    <canvas width="300" resize id="view" ref="view"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imagePath: '',
      paper: null, // Our Paper instance
    }
  },
  mounted() {
    // Create and store the Paper instance in a Vue variable (this.paper)
    this.paper = this.$paper.setup(this.$refs.view)

    console.log(this.paper.view.size.width)

    const radius = 40
    const marginX = 20

    var iconX = Math.round(radius + 1)
    var iconY = Math.round(this.paper.view.size.height / 2)

    var icon = new this.paper.Path.Circle({
      center: new this.paper.Point(iconX, iconY),
      radius: radius,
      strokeColor: new this.paper.Color(1, 0, 0),
    })

    var textX = radius * 2 + marginX
    var textY = iconY - radius

    // Create a rectangle shaped path to the right, to fit the text into.
    var pathText = new this.paper.Path.Rectangle({
      point: [textX, textY],
      size: [this.paper.view.size.width - textX, radius * 2],
    })

    this.textInFont('Test X', 'fontX').then(() => {
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
  methods: {
    async textInFont(textStr, fontName) {
      const svg = await this.$axios.$get(
        'https://9amim.netlify.app/.netlify/functions/text-to-svg?text=' +
          textStr
      )
      this.textSVG = svg
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
