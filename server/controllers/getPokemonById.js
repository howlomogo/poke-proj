/**
 * Route for fetching pokemon by id
 */
const axios = require('axios')
const _ = require('lodash')

const { getPokemonSpeciesInfo } = require('../services/getPokemonSpeciesInfo')

const { getCache, setCache } = require('../helpers/cache')
const { formatDexNumber } = require('../helpers/formatDexNumber')

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
      const stats = pokemonInfo.stats.map(stat => {
        let name = stat.stat.name

        if (stat.stat.name === 'special-attack') name = 'Sp. Atk'
        if (stat.stat.name === 'special-defense') name = 'Sp. Def'
        if (stat.stat.name === 'hp') name = 'HP'

        return {
          name,
          value: stat.base_stat
        }
      })

      const pokedexNumber = formatDexNumber(pokemonInfo.id)

      // Pick some information off species endpoint (We can add more from here in the future)
      const pokemonSpeciesInfo = await getPokemonSpeciesInfo(name)

      console.log(pokemonSpeciesInfo)

      res.send({
        name: pokemonInfo.name,
        id: pokemonInfo.id,
        pokedexNumber,
        description: pokemonSpeciesInfo.description,
        abilities: pokemonInfo.abilities,
        height: pokemonInfo.height,
        weight: pokemonInfo.weight,
        image: _.get(pokemonInfo, 'sprites.other.official-artwork.front_default', ''),
        moves: pokemonInfo.moves,
        types: pokemonInfo.types,
        stats: stats
      })
    }
  } catch(err) {
    res.sendStatus(500)
  }
}