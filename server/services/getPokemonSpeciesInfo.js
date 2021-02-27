/**
 * Call endpoint which retusn various other info on the pokemon
 * Can return more data from here in future i.e. evolution chains etc
*/
const axios = require('axios')
const { response } = require('express')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')
const { formatDexNumber } = require('../helpers/formatDexNumber')

exports.getPokemonSpeciesInfo = async function(name) {
  const requestUrl = `https://pokeapi.co/api/v2/pokemon-species/${name}`

  let responseData

  const cachedPokemonResponse = await getCache(requestUrl)

  if(cachedPokemonResponse) {
    responseData = cachedPokemonResponse
  } else {
    // Get the responseData from url
    const response = await axios.get(requestUrl)

    // Set the redis cache with data for that url
    await setCache(requestUrl, response.data)

    responseData = response.data
  }

  const speciesData = responseData

  // Lets just pick off description for now
  return {
    description: _.get(speciesData, 'flavor_text_entries[0].flavor_text', '')
  }
}