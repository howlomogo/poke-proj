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


    // Page number will be used to fetch FROM "list"
    // We would say for example if showPerPage is 2 and we want page 3 we want to pull 5 and 6
    // ^ REMEMBER we are NOT actually using offset at all on the pokeapi.co endpoints
    // but we will splice it from the results list, those will then be used to fetch the pokemon info


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

    // We now have the full list or filtered list in list variable
    // We now would now need to sort out the pagination / limit / offset
    // For now lets just splice the array by the showPerPage (limit)
    // and get / return the pokemon info on these
    // TODO HERE PAGINATION!!!

    // Pagination - showPerPage is useful to add here incase we change the showPerPage on the frontend without submitting then click the pagination
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



    /**
     * pagenumber is not set on state, which brings the question should we always be calling getResults from pagination
     * kinf od thinking we could actually STORE and send to the front end the fullResultsList within the pagination object.
     * Then IF we click the pagination button on the front end we still pass showPerPage and pageNumber but to a new endpoint pagination
     * Here we will pass in the fullResultslist we set and handle the resultsListWithInfo in  there as well.
     * We can then call that pagination endpoint from this getResults still.
     * ^ Would this work with using URL params?
     * We would ONLY ever call the pagination route directly IF hitting one of the buttons.
     */

     console.log(pagination)

    res.send({
      results: resultsListWithInfo,
      pagination: pagination
    })
  } catch {
    res.send('ERROR')
  }
}