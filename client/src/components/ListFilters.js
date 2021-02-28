import React, { useState, useEffect } from 'react';

function ListFilters(props) {
  const [filterOptions, setFilterOptions] = useState({
    typeOptions: []
    //...Other filters
  })

  const handleSetFilterOptions = async () => {
    // Get Filter Options
    await fetch(`http://localhost:3000/options-types`)
      .then(res => res.json())
      .then(data => {
        // Set default selected to false
        const typeOptions = data.map(item => {
          return {
            ...item,
            selected: false
          }
        })

        setFilterOptions({
          ...filterOptions,
          typeOptions: typeOptions
        })
      })
  }

  // ComponentDidMount
  useEffect(() => {
    handleSetFilterOptions()
  }, [])

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="container px-4 mx-auto py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="font-medium mb-1">Types:</label>

              <div className="flex flex-wrap">
                {filterOptions.typeOptions.map(item => {
                  return (
                    <div key={item.name} className="w-28 flex items-center">
                      <input
                        type="checkbox"
                        checked={props.selectedFilters.types.includes(item.name) ? true : false}
                        onChange={(e) => props.handleFilterChange(e, 'types')}
                        id={item.name}
                        className="mr-2"
                      />

                      <label htmlFor={item.name}>
                        {item.name}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="text-xs mb-2">
                Click button to apply any filters / per page.<br />
                This will be amended to auto update in the future. (Aswell as more filters)
              </p>
              <button
                onClick={() => { props.getResults(props.defaultPageNumber)}}
                className="bg-blue-400 px-4 py-2 rounded text-white shadow mb-2"
              >
                Get Results
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-600 text-gray-100">
        <div className="container px-4 mx-auto py-2">
          <div className="flex justify-between">

            <div className="flex items-center">
              <span className="font-medium">Showing {props.showingPerPage} of {props.total} results</span>
            </div>

            {/* Show per page */}
            <div className="flex items-center">
              <label className="mr-2 font-medium">Show per page: </label>
              <select
                value={props.showPerPage}
                onChange={(e) => props.setShowPerPage(e.target.value)}
                className="small-dropdown p-2 rounded outline-none text-gray-500 font-semibold"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default ListFilters