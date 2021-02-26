import _ from 'lodash'
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

  const [pokemonData, setPokemonData] = useState({})

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
          stats: res.data.stats
        })
      })
      .catch(err => {
        setHasError(true)
      })
      setIsLoading(false)
      
  }

  return(
    <div className="container">
      <div className="row mt-4">
        <div className="col-12 text-center ">
          {isLoading &&
            <Loader />
          }
          
          {hasError && !isLoading &&
            <div class="alert alert-danger" role="alert">
              We could not fetch this pokemon - <Link to="/list">Go Back to the list view</Link>
            </div>
          }
          
          {!isLoading && !hasError &&
            <div>
              <h1>Name {pokemonData.name}</h1>
              <img src={pokemonData.image} />
              <h1>Height {pokemonData.height}</h1>
              <h1>Weight {pokemonData.weight}</h1>
              <h1>Id {pokemonData.id}</h1>

              {pokemonData.stats.map(stat => {
                return (
                  <React.Fragment>
                    <h1>{stat.stat.name}</h1>
                    <h1>{stat.base_stat}</h1>
                  </React.Fragment>
                )
              })}

              {pokemonData.types.map(type => {
                return (
                  <h1>{type.type.name}</h1>
                )
              })}

              {pokemonData.moves.map(move => {
                return (
                  // You could colour these to be the pokemons primary type. We could colour them to the move type but will leave for now
                  <span class="badge badge-pill badge-primary mr-1">{move.move.name}</span>
                )
              })}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Pokemon

