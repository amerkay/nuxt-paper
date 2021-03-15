// Docs https://github.com/shrhdk/text-to-svg
const TextToSVG = require('text-to-svg')

// const textToSVG = TextToSVG.loadSync()

const path = require('path')

// const fs = require('fs')

// fs.readdirSync('/var/task/src/netlify/functions/text-to-svg/fonts/').forEach(
//   (file) => {
//     console.log(file)
//   }
// )

// see https://github.com/netlify/function-deploy-test/blob/master/lambda/zipped-function/zipped-function.js#L6-L8
// path of the included file will be `process.env.LAMBDA_TASK_ROOT/{name_of_function}/{included_filename}`
// const fileName = 'Redressed-Regular.ttf'
// const resolved = process.env.LAMBDA_TASK_ROOT
//   ? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName)
//   : path.resolve(__dirname, fileName)

// Production path
var fileName = 'Redressed-Regular.ttf'
var fontPath = '/var/task/src/netlify/functions/text-to-svg/fonts/'
if (process.env.NODE_ENV !== 'production') {
  fontPath = 'fonts/' // dev path
}

const textToSVG = TextToSVG.loadSync(
  path.resolve(__dirname, fontPath + fileName)
)

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
