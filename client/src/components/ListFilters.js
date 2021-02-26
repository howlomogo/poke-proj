import React, { useState, useEffect, useRef } from 'react';

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
    // NOTE: This is NOT run in order as useEffect doesn't support promises...
    handleSetFilterOptions()
  }, [])

  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="container px-4 mx-auto py-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h5 className="font-medium mb-1">Types:</h5>

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
                className="bg-blue-500 px-4 py-2 rounded text-white shadow mb-2"
              >
                Get Results
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800">
        <div className="container px-4 mx-auto py-2">
          <div className="flex justify-between">

            <div className="flex items-center">
              <label className="text-white mr-2">Search: </label>
              <input
                placeholder="Will be added in future!"
                disabled
                className="p-2 rounded outline-none text-sm"
              />
            </div>

            {/* Show per page */}
            <div className="flex items-center">
              <label className="text-white mr-2">Show per page: </label>
              <select
                value={props.showPerPage}
                onChange={(e) => props.setShowPerPage(e.target.value)}
                className="p-2 rounded outline-none"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}

export default ListFilters