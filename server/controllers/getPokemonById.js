/**
 * Route for fetching pokemon by id
 */
const axios = require('axios')
const _ = require('lodash')

const { getCache, setCache } = require('../helpers/cache.js')

exports.getPokemonById = async function getPokemonById(req, res) {
  try {
    const { name } = req.params
    let url = `https://pokeapi.co/api/v2/pokemon/${name}/`
    const cachedResponse = await getCache(url)
    
    let pokemonInfo = null

    if (cachedResponse) {
      pokemonInfo = cachedResponse
    } else {
      const response = await axios.get(url)

      await setCache(url, response.data)
      pokemonInfo = response.data
    }

    if (!pokemonInfo) {
      res.sendStatus(500)
    } else {
      res.send({
        name: pokemonInfo.name,
        id: pokemonInfo.id,
        abilities: pokemonInfo.abilities,
        height: pokemonInfo.height,
        weight: pokemonInfo.weight,
        image: _.get(pokemonInfo, 'sprites.other.official-artwork.front_default', ''),
        moves: pokemonInfo.moves,
        types: pokemonInfo.types,
        stats: pokemonInfo.stats
      })
    }
  } catch(err) {
    res.sendStatus(500)
  }
}