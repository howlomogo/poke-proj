/**
 * Returns all options for the different pokemon types
 */
const axios = require('axios')
const _ = require('lodash')

const { getCache, setCache } = require('../helpers/cache.js')

exports.getPokemonTypeOptions = async function(req, res) {
  try {
    let url = 'https://pokeapi.co/api/v2/type?limit=9999'
    const cachedResponse = await getCache(url)
    
    let typesList

    if (cachedResponse) {
      typesList = cachedResponse
    } else {
      const response = await axios.get(url)

      await setCache(url, response.data)
      typesList = response.data
    }

    res.send(
      typesList.results
    )
  } catch(err) {
    res.sendStatus(500)
  }
}