import classNames from 'classnames'
import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { ReactComponent as LeftArrow } from '../assets/chevron-left-solid.svg'
import { ReactComponent as RightArrow } from '../assets/chevron-right-solid.svg'

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
    <React.Fragment>
      {pagination.pages.length > 0 &&
        <nav className="flex mb-12 justify-center text-gray-500">
          <ul className="flex border-solid border border-gray-500 rounded">
            {pagination.active > 1 &&
              <li onClick={() => props.getResults(pagination.active - 1)}
                className={classNames("py-2 px-4 cursor-pointer border-solid border-r border-gray-300 flex items-center",  {
                'disabled': props.resultsLoading
              })}>
                <LeftArrow className="h-4 text-gray-500" />
              </li>
            }
          
            {pagination.pages.map((item) => {
              return (
                <li
                  onClick={() => props.getResults(item.pageNumber)}
                  key={item.pageNumber}
                  className={classNames("py-2 px-4 cursor-pointer border-solid border-r border-gray-300",  {
                    'bg-gray-500 text-white': pagination.active === item.pageNumber,
                    'disabled': props.resultsLoading
                  })}
                >
                  {item.pageNumber}
                </li>
              )
            })}
          
            {pagination.active !== pagination.maxLength &&
              <li
                onClick={() => props.getResults(pagination.active + 1)}
                className={classNames("py-2 px-4 cursor-pointer flex items-center",  {
                'disabled': props.resultsLoading
              })}>
                <RightArrow className="h-4 text-gray-500" />
              </li>
            }
          </ul>
        </nav>
      }
    </React.Fragment>
  )
}

export default Pagination