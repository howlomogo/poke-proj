/**
 * Pass in array of pokemon we want to get info for
 * Return as an array of pokemon with info
*/
const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')

exports.getResultsListInfo = async function(list) {
  // console.log('---getResultsListInfo')
  const pokemonListWithInfo = await list.reduce(async (previousPromise, pokemon) => {
    let pokemonArray = await previousPromise
    let pokemonInfo

    console.log('---', pokemon)

    // Check if pokemon route was cached
    const cachedPokemonResponse = await getCache(pokemon.url)

    if(cachedPokemonResponse) {
      pokemonInfo = cachedPokemonResponse
    } else {
      // Get the pokemonInfo from url
      const response = await axios.get(pokemon.url)

      // Set the redis cache with data for that url
      await setCache(pokemon.url, response.data)

      pokemonInfo = response.data
    }

    // We can now set what data we want on the front end for the list view
    pokemonArray.push({
      name: pokemonInfo.name,
      id: pokemonInfo.id,
      abilities: pokemonInfo.abilities,
      height: pokemonInfo.height,
      image: _.get(pokemonInfo, 'sprites.other.official-artwork.front_default', '') // Todo add placeholder incase image doesn't exist
    })

    return pokemonArray
  }, Promise.resolve([]))

  return pokemonListWithInfo
}


// Go through all pokemon endpoint urls returned ***synchronously***
// Check below for example of how reduce Promise works here
// https://stackfive.io/blog/using-async-await-with-reduce
// Returns an array of pokemon info