const path = require('path')

// Docs https://github.com/shrhdk/text-to-svg
const TextToSVG = require('text-to-svg')

// Production or Dev mode path
var fileName = 'Redressed-Regular.ttf'
var fontPath = '/var/task/src/netlify/functions/text-to-svg/fonts/'
if (process.env.NODE_ENV !== 'production') {
  fontPath = 'fonts/' // dev path
}

const textToSVG = TextToSVG.loadSync(
  path.resolve(__dirname, fontPath + fileName)
)

exports.handler = function (event, context, callback) {
  // Read the query line ?text=
  const text = event.queryStringParameters.text || 'Test Co'

  const attributes = { fill: 'red', stroke: null }
  const options = {
    x: 0,
    y: 0,
    fontSize: 72,
    anchor: 'top',
    attributes: attributes,
  }

  const svg = textToSVG.getSVG(text, options)

  callback(null, {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
    },
    body: svg,
  })
}
