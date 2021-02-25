const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')

exports.getPokemonListByTypes = async function(types) {
  console.log('---getPokemonListByTypes')
  try {
    const list = await types.reduce(async (previousPromise, type) => {
      let pokemonArray = await previousPromise

      const requestUrl = `https://pokeapi.co/api/v2/type/${type}?limit=9999`

      let pokemonListFromType

      // Check if pokemon route was cached
      const cachedPokemonResponse = await getCache(requestUrl)

      if(cachedPokemonResponse) {
        pokemonListFromType = cachedPokemonResponse
      } else {
        // Get the pokemonListFromType from url
        const response = await axios.get(requestUrl)

        // Set the redis cache with data for that url
        await setCache(requestUrl, response.data)

        pokemonListFromType = response.data
      }


      // TODO: Could add this as a helper to get pick the id off the url will need this on all filtered
      const resultsToReturn = pokemonListFromType.pokemon.map(item => {
        // Bit hacky but pick the pokemon id off the url
        // We need this for sorting the array
        const urlArray = item.pokemon.url.split('/')
        const id = Number(urlArray[urlArray.length - 2])

        return {
          ...item.pokemon,
          id
        }
      })

      pokemonArray = pokemonArray.concat(resultsToReturn)

      return pokemonArray
    }, Promise.resolve([]))

    return list
  } catch {
    return []
  }
}