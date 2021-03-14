const path = require('path')

// Docs https://github.com/shrhdk/text-to-svg
const TextToSVG = require('text-to-svg')

// const textToSVG = TextToSVG.loadSync()

// path of the included file will be `process.env.LAMBDA_TASK_ROOT/{name_of_function}/{included_filename}`
const fileName = './fonts/Redressed-Regular.ttf'
const resolved = process.env.LAMBDA_TASK_ROOT
  ? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName)
  : path.resolve(__dirname, fileName)

const textToSVG = TextToSVG.loadSync(resolved)

exports.handler = function (event, context, callback) {
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
