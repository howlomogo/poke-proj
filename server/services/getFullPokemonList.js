/**
 * Fetches array of ALL pokemon with urls i.e. https://pokeapi.co/api/v2/
 * Fetches pokemon info from these urls and return array of all the pokemon info
 * Returns the list of pokemon -
 * We don't care about returning pagination from here as will implement our own
 */
const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')

exports.getFullPokemonList = async function() {
  console.log('---getFullPokemonList')
  try {
    let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?limit=9999`

    // Check if the key / data is already cached
    const cachedResponse = await getCache(pokeApiUrl)

    let list = null

    if (cachedResponse) {
      list = cachedResponse.results
    } else {
      const response = await axios.get(pokeApiUrl)

      await setCache(pokeApiUrl, response.data)
      list = response.data.results
    }
    return list
  } catch {
    return []
  }
}