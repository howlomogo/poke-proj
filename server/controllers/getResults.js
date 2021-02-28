const axios = require('axios')
const _ = require('lodash')

const {getCache, setCache } = require('../helpers/cache.js')
const { getResultsListInfo } = require('../services/getResultsListInfo')
const { getFullPokemonList } = require('../services/getFullPokemonList')
const { getPokemonListByTypes } = require('../services/getPokemonListByTypes')

// req should contain
// filters: { types: ['',''], otherfilters} - obj
// resultsPerPage: 10 - num i.e. limit
// Page number: ?? // offset
exports.getResults = async function(req, res) {
  try {
    // Check if we have any filters selected. If so run filter
    // If not run get all results(With limit) - dont worry about offset yet

    const filters = JSON.parse(req.query.filters)

    // We always use this limit unless we are fetch list of data we need to loop through etc
    const showPerPage = req.query.showPerPage || "20"
    const pageNumber = req.query.pageNumber || "1"

    let fullResultslist = []
    
    // Lets just check types filter for, but we would need to check if ANY filters are active
    if (_.isEmpty(filters.types)) {
      // Return full list if we dont have any filters
      fullResultslist = await getFullPokemonList()
    } else {
      // Filter by each selected option
      let allMatchingPokemonArray = []
      
      // Will return ALL matching pokemon of all types selected
      // getPokemonByHabitat(filters.habitat) - do for each filter
      if (filters.types) {
        const pokemonFilteredByType = await getPokemonListByTypes(filters.types)
        allMatchingPokemonArray = allMatchingPokemonArray.concat(pokemonFilteredByType)
      }

      /**
       * allMatchingPokemonArray contains everything returned from the endpoints
       * so we need to remove all duplicates and then sort the array by the pokemon id
       */
      const uniquePokemonList = _.uniqBy(allMatchingPokemonArray, 'name')
      fullResultslist = _.sortBy(uniquePokemonList, 'id')
    }

    let pagination = []
    let pageCounter = 1
    
    fullResultslist.forEach((item, index) => {
      if (index % showPerPage === 0) {
        pagination.push({
          pageNumber: pageCounter,
          showPerPage
        })
        pageCounter+=1
      }
    })

    const resultsEndPosition = showPerPage * pageNumber
    const resultsStartPosition = resultsEndPosition - showPerPage

    const resultsList = fullResultslist.slice(resultsStartPosition, resultsEndPosition)
    const resultsListWithInfo = await getResultsListInfo(resultsList)

    res.send({
      results: resultsListWithInfo,
      pagination: pagination,
      total: fullResultslist.length
    })
  } catch {
    res.send('ERROR')
  }
}