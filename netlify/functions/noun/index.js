// Docs https://github.com/rosshettel/the-noun-project
// API Explorer https://api.thenounproject.com/explorer

const NounProject = require('the-noun-project')
const _ = require('lodash')

// From: https://thenounproject.com/developers/apps/105311b747b34a4ea1bc10bc9ae8c258/
const nounProject = new NounProject({
  key: '105311b747b34a4ea1bc10bc9ae8c258',
  secret: 'd66ce3820613479c8d767f8d7fe0f7ba',
})

var icons = []
var finished = null

async function getIconsByTerm(term, callback) {
  nounProject.getIconsByTerm(
    term,
    { limit: 50, limit_to_public_domain: true },
    callback
  )
}

// Using _.after https://stackoverflow.com/a/18011673
function returnOnFinished(numberOfTerms, callback) {
  finished = _.after(numberOfTerms, () => {
    // successful return
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(icons),
    })
  })
}

function validateTerms(termsParam, callback) {
  if (!termsParam) {
    callback(null, {
      statusCode: 403,
      body: JSON.stringify({
        error: true,
        message: 'You need to enter a term to search the NP.',
      }),
    })
  }
}

exports.handler = function (event, context, callback) {
  const termsParam = event.queryStringParameters.terms
  validateTerms(termsParam, callback)

  const terms = termsParam.split(',')

  returnOnFinished(terms.length, callback)

  terms.forEach((term) => {
    getIconsByTerm(term, function (err, data) {
      if (!err) {
        data.icons.forEach((icon) => {
          icons.push({ id: icon.id, icon_url: icon.icon_url })
        })
      } else {
        console.error(`Got error from NP for term ${term}. ${err}`)
      }

      // Using _.after https://stackoverflow.com/a/18011673
      finished()
    })
  })
}
