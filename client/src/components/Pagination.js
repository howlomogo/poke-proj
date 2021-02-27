import classNames from 'classnames'
import { useState, useEffect, useRef } from 'react'

function Pagination(props) {
  let firstUpdate = useRef(true)

  const [pagination, setPagination] = useState({
    pages: [],
    active: 0,
    maxLength: 0
  })

  // Update the pagination whenever resultsData changes
  // firstUpdate prevents running on mount
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    handleSetPagination(props.resultsData.pagination, props.resultsData.page)
  }, [props.resultsData])

  const handleSetPagination = (paginationArray, page) => {
    let paginationStartPosition

    // Set the number of pagination buttons to show
    let numButtonsToShow = 9

    // If numbersToShow is more than we have available set the max amount to the available amount
    if(numButtonsToShow > paginationArray.length) {
      numButtonsToShow = paginationArray.length
    }

    const midPointHigh = Math.ceil(numButtonsToShow /2)
    const midPointLow = Math.floor(numButtonsToShow /2)

    if(page <= midPointLow) {
      paginationStartPosition = 0
    } else if (page >= paginationArray.length -midPointLow) {
      paginationStartPosition = paginationArray.length -numButtonsToShow
    } else {
      paginationStartPosition = page -midPointHigh
    }

    let smallPagination = paginationArray.slice().splice(paginationStartPosition, numButtonsToShow)
    
    setPagination({
      pages: smallPagination,
      active: page,
      maxLength: paginationArray.length // Use length to determind end for next button
    })
  }

  return (
    <nav className="mx-auto mb-4">
      <ul className="pagination mb-0">
        {pagination.active > 1 &&
          <li className={classNames("page-item",  {
            'disabled': props.resultsLoading
          })}>
            <a className="page-link"
              onClick={() => props.getResults(pagination.active - 1)}>
                Previous
            </a>
          </li>
        }
      
        {pagination.pages.map((item) => {
          return (
            <li
              key={item.pageNumber}
              className={classNames("page-item",  {
                'active': pagination.active === item.pageNumber,
                'disabled': props.resultsLoading
              })}
            >
              <a
                className="page-link"
                onClick={() => props.getResults(item.pageNumber)}
              >
                {item.pageNumber}
              </a>
            </li>
          )
        })}
      
        {pagination.active !== pagination.maxLength &&
          <li className={classNames("page-item",  {
            'disabled': props.resultsLoading
          })}>
            <a className="page-link"
            onClick={() => props.getResults(pagination.active + 1)}>
              Next
            </a>
          </li>
        }
      </ul>
    </nav>
  )
}

export default Pagination