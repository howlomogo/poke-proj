/**
 * Pass in array of pokemon we want to get info for
 * Return as an array of pokemon with info
*/
const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')
const { formatDexNumber } = require('../helpers/formatDexNumber')

exports.getResultsListInfo = async function(list) {
  let resultsWithPokemonInfo = list.map(async pokemon => {
    const cachedPokemonResponse = await getCache(pokemon.url)
  
    let pokeInfoResponse = null
    if (cachedPokemonResponse) {
      // If the url has been cached get the info from the cache
      pokeInfoResponse = cachedPokemonResponse
    } else {
      // If the url has not been cached then get the info from pokeapi
      console.log('Fetching data from ---', pokemon.url)
      pokeInfoResponse = await axios.get(pokemon.url)
      pokeInfoResponse = pokeInfoResponse.data // Fix this
  
      // Set the redis cache is we fetched the pokemon info
      await setCache(pokemon.url, pokeInfoResponse)
    }
    return pokeInfoResponse
  })
  
  const resultsArray = await Promise.all(resultsWithPokemonInfo)

  const mappedArray = resultsArray.map(pokemon => {
    const pokedexNumber = formatDexNumber(pokemon.id)

    return {
      name: pokemon.name,
      id: pokemon.id,
      pokedexNumber,
      types: pokemon.types,
      image: _.get(pokemon, 'sprites.other.official-artwork.front_default', '')
    }
  })

  return mappedArray
}
