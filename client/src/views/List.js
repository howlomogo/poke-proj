import _ from 'lodash'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

// Components
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import ListItem from '../components/ListItem'
import ListFilters from '../components/ListFilters'

const List = () => {
  const defaultPageNumber = 1

  const [resultsLoading, setResultsLoading] = useState(false)

  const [selectedFilters, setSelectedFilters] = useState({
    types: []
    //...Other filters
  })

  const [showPerPage, setShowPerPage] = useState("10")

  const [resultsData, setResultsData] = useState({
    results: [],
    pagination: [],
    page: defaultPageNumber
  })

  // ComponentDidMount
  useEffect(() => {
    setup()
  }, [])

  const setup = async () => {
    await getResults(defaultPageNumber)
  }

  /**
   * Calls endpoint which will get and return array of pokemon results including pokemon info
   * @param limit 10/20/30 - resultsPerPage
   * @param pageNumber - Dont worry about this yet
   * @param filters [{types: [], habitat: []}] - selectedFilters
   * Currently picking these off state, but we could use url params for deep linking, we would need to do some rework for that however
   */
  const getResults = async (page) => {
    setResultsLoading(true)
    const params = {
      showPerPage: showPerPage,
      filters: selectedFilters,
      pageNumber: page
    }
    
    await axios.get('http://localhost:3000/results', { params })
      .then(res => {
        setResultsData({
          results: res.data.results,
          pagination: res.data.pagination,
          page: page
        })
      })
    
      setResultsLoading(false)
  }

  // Updates the selectedFilters state to add / remove any added filters
  const handleFilterChange = (e, filterKey) => {
    let selectedFiltersClone = _.cloneDeep(selectedFilters)

    // Return whether or not the filter is already selected
    const filterPosition = selectedFiltersClone[filterKey].indexOf(e.target.id)

    if (filterPosition === -1) {
      selectedFiltersClone[filterKey].push(e.target.id)
    } else {
      selectedFiltersClone[filterKey].splice(filterPosition, 1)
    }

    setSelectedFilters(selectedFiltersClone)
  }
  
  return (
    <React.Fragment>
      {/* Filters */}
      <ListFilters
        getResults={getResults}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        setShowPerPage={setShowPerPage}
        showPerPage={showPerPage}
        defaultPageNumber={defaultPageNumber}
      />

      <div className="container mx-auto">
        {/* Loader */}
        {resultsLoading ? (
          <div className="container" style={{'height': '300px'}}>
            <div className="row mt-4">
              <div className="col-12 text-center ">
                <Loader />
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            {/* Results */}
            {resultsData.results &&
              <div className="container">
                <div className="row mt-4">
                  {resultsData.results.map(pokemon => {
                    return (
                      <ListItem
                        id={pokemon.id}
                        name={pokemon.name}
                        height={pokemon.height}
                        image={pokemon.image}
                        key={pokemon.id}
                      />
                    )
                  })}
                </div>
              </div>
            }
          </React.Fragment>
        )}

        {/* Pagination */}
        <div className="container">
          <div className="row">
            <Pagination
              getResults={getResults}
              resultsData={resultsData}
              resultsLoading={resultsLoading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default List