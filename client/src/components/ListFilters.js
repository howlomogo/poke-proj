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
    <div className="bg-black mb-4">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <h5>Types:</h5>
            {/* Types Loop through types */}
            <div className="d-flex flex-wrap flex-row">
              {filterOptions.typeOptions.map(item => {
                return (
                  <div key={item.name} className="p-1">
                    <input
                      type="checkbox"
                      checked={props.selectedFilters.types.includes(item.name) ? true : false}
                      onChange={(e) => props.handleFilterChange(e, 'types')}
                      id={item.name}
                      className="mr-1"
                    />

                    <label htmlFor={item.name} className="mb-0 text-white">
                      {item.name}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>


          <div className="col-6">
            <button
              onClick={() => { props.getResults(props.defaultPageNumber)}}
              className="btn btn-success"
            >
              Get Results
            </button>

            {/* Show per page */}
            <select
              value={props.showPerPage}
              onChange={(e) => props.setShowPerPage(e.target.value)}
              id="showPerPage"
              className="custom-select custom-select-sm mt-4"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListFilters