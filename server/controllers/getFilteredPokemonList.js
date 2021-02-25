/**
 * Overall route for filtering pokemon on search view.
 * This will take in an array of filter options such as type, habitat
 * And run all endpoints for this filtering 
 * We could break out those other endpoints also and import / run them all here.
 * but lets keep it simple for now
 * 
 * 1. Call every end point passed into the filters
 * i.e. types/ground, types/fire, habitat/cave
 * We will then have loads of arrays each containing a list of pokemon
 * This either works two ways. i.e. they are filtered OUT or filtered IN.
 * I think we should filter in! i.e if we select fire AND ice it will show all fire and ice.
 * If we filter by nothing then show all. and put something in the frontend saying showing all.
 */
const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')
const { getResultsListInfo } = require('../services/getResultsListInfo')

exports.getFilteredPokemonList = async function(req, res) {
  try {
    // Pull out the filterTypes off the request
    const {
      types,
      habitat,
      etc
    } = req.query

    if (_.isEmpty(req.query)) {
      // Return something to say select a filter or something
      res.send([])
    } else {
      // This will contain every pokemon meeting filtered requirements, including dupilcates
      // These will be filtered out at the end
      let allFilteredPokemonList =[]

      // We can make new files for filter end points.
      // Types
      if (types) {
        // Need to copy the pokemonList with pokeid stuff here as we are awaiting
        // in a loop!!!
        const allPokemonFilteredByType = await types.reduce(async (previousPromise, type) => {
          let pokemonArray = await previousPromise

          console.log('-------------------------------------------------------------------------------------------')

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

        // Add ALL the pokemon returned from the types selected to allFilteredPokemonList
        allFilteredPokemonList = allFilteredPokemonList.concat(allPokemonFilteredByType)
      }


      // We can pass in a sort here, for id or name
      const uniquePokemonList = _.uniqBy(allFilteredPokemonList, 'name')
      const sortedUniquePokemonList = _.sortBy(uniquePokemonList, 'id')


      // Lets just temporarily splice this array otherwise we will be fetching a ton of pokemon
      const tempSplicedList = sortedUniquePokemonList.slice(0,20)
      
      // Duplication of getPokeList we can break this out into a seperate function
      // This is NOT .results as in getPokemonList just something to be wary of when we split it out
      const pokemonListWithInfo = await getResultsListInfo(tempSplicedList)


      res.send(pokemonListWithInfo)
    }
  } catch(err) {
    res.sendStatus(500)
  }
}