import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {
  Link
} from "react-router-dom";

// Components
import Loader from '../components/Loader'

function Pokemon() {
  const [isLoading, setIsLoading] = useState(true)

  const [pokemon, setPokemonData] = useState({})

  const [hasError, setHasError] = useState(false)

  // Get the name off the url
  const { name } = useParams()

  // Fetch pokemon info from name parameter
  useEffect(() => {
    getPokemon()
  }, [])

  const getPokemon = async () => {
    setIsLoading(true)
    
    await axios.get(`http://localhost:3000/pokemon/${name}`)
      .then(res => {
        setPokemonData({
          name: res.data.name,
          id: res.data.id,
          abilities: res.data.abilities,
          height: res.data.height,
          weight: res.data.weight,
          image: res.data.image,
          moves: res.data.moves,
          types: res.data.types,
          stats: res.data.stats,
          pokedexNumber: res.data.pokedexNumber,
          description: res.data.description
        })
      })
      .catch(err => {
        setHasError(true)
      })
      setIsLoading(false)
      
  }

  return(
    <div className="container px-4 mx-auto mt-12 mb-16">
      {isLoading &&
        <Loader />
      }
      
      {hasError && !isLoading &&
        <div>
          We could not fetch this pokemon - <Link to="/list">Go Back to the list view</Link>
        </div>
      }

      <h3 className="text-3xl capitalize mb-1">{pokemon.name}</h3>

      <hr className="mb-8 border-1 border-dashed border-black" />
      
      {!isLoading && !hasError &&
        <React.Fragment>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
            <div>
              <img src={pokemon.image} className="w-2/3 mx-auto" alt="Pokemon" />
            </div>

            <div>
              <h4 className="text-2xl mb-1">Stats</h4>

              {pokemon.stats.map(stat => {
                return (
                  <div key={stat.name} className="flex items-center">
                    <div className="w-3/12">
                      <span className="capitalize">{stat.name}</span>
                    </div>

                    <div className="w-2/12 text-right pr-4">
                      <span className="font-medium">{stat.value}</span>
                    </div>

                    <div className="relative pt-1 w-7/12">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                        <div style={{ 'width': stat.value + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>              
              <div className="mb-2">
                <h4 className="text-2xl capitalize mb-1">National pokedex number</h4>
                <p>{pokemon.pokedexNumber}</p>
              </div>

              <div className="mb-2">
                <h4 className="text-2xl capitalize mb-1">Types</h4>
                
                {pokemon.types.map(type => {
                  return (
                    <p key={type.type.name}>{type.type.name}</p>
                  )
                })}
              </div>

              <div className="mb-2">
                <h4 className="text-2xl capitalize mb-1">Description</h4>
                <p>{pokemon.description}</p>
              </div>

              <div>
                <h4 className="text-2xl capitalize mb-1">Measurements</h4>
                <p>Height: {pokemon.height * 10}cm</p>
                <p>Weight: {pokemon.weight / 10}kg</p>
              </div>
            </div>

            <div>
              <h4 className="text-2xl capitalize mb-1">Moves</h4>

              <div className="flex flex-wrap">
                {pokemon.moves.map(move => {
                  return (
                    <span key={move.move.name} className="bg-green-400 py-1 px-2 rounded-full mr-2 mb-1 text-xs text-white">{move.move.name}</span>
                  )
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

export default Pokemon

