/**
 * Route for fetching list of pokemon
 * Fetches array of pokemon with urls i.e. https://pokeapi.co/api/v2/pokemon/56
 * Fetches pokemon info from these urls and return array of all the pokemon info
 * @req (query) - offset, limit
 * @res { count, next, previous, list}
 */
const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')
const { getResultsListInfo } = require('../services/getResultsListInfo')

exports.getPokemonList = async function(req, res) {
  try {    
    // Get the full request URL
    const reqUrl = new URL(req.protocol + '://' + req.get('host') + req.originalUrl)

    // Pull out any query params we have (limit / offset)
    let params = {}

    new URLSearchParams(reqUrl.search).forEach((value, key) => {
      if(key && value) {
        params[key] = value
      }
    })

    // console.log(params)

    // console.log(reqUrl)

    // Set pokeapi.co url to pull data from, this will also be used as key for storing response in redis
    let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon${reqUrl.search}`

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

    const pokemonListWithInfo = await getResultsListInfo(list)

    res.send({
      pagination: [],
      list: pokemonListWithInfo
    })
  } catch(err) {
    res.sendStatus(500)
  }
}
