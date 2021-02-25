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
          image: res.data.image
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
              <h1>Id {pokemonData.id}</h1>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Pokemon

