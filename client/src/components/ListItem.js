import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'

import typeColorMappings from '../mappings/typeColorMapping'

function ListItem(props) {

  const [pokemonColor, setPokemonTypeColor] = useState('')

  useEffect(() => {
    getPokemonTypeColor()
  }, [])

  const getPokemonTypeColor = () => {
    const firstType = _.get(props, 'types[0].type.name', '')

    const matchingType = typeColorMappings.find(item => {
      return item.type === firstType
    })

    setPokemonTypeColor(_.get(matchingType, 'color', '#CACAAE'))
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 px-2 text-white">
      <div
        className="p-4 relative overflow-hidden rounded shadow"
        style={{ 'backgroundColor': pokemonColor}}
      >
        <div className="list-item-circle-overlay"/>

        <div className="relative z-10">
          <h4 className="absolute text-2xl font-medium">
            {props.pokedexNumber}
          </h4>
          
          <img
            src={props.image}
            alt="Pokemon"
            className="w-2/3 mx-auto"
          />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="capitalize text-2xl font-medium">{props.name}</h3>

              {props.types.map((type, i) => {
                return (
                  <span key={type.type.name} className="capitalize font-light">
                    {type.type.name}
                    {i != props.types.length -1 &&
                      <span>, </span>
                    }
                  </span>
                )
              })}
            </div>

            <Link to={`/pokemon/${props.name}`}>
              <button className="bg-black px-8 py-2 rounded-full text-white bg-opacity-10">
                View
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem