// Async version of pokemonList - faster, but potentially not as reliable

let pokemonListWithPokemonInfo = pokemonListResults.results.map(async pokemon => {
  const cachedPokemonResponse = await getCache2(pokemon.url)

  let pokeInfoResponse = null
  if (cachedPokemonResponse) {
    // If the url has been cached get the info from the cache
    pokeInfoResponse = cachedPokemonResponse
  } else {
    // If the url has not been cached then get the info from pokeapi
    console.log('Fetching data from ---', pokemon.url)
    pokeInfoResponse = await axios.get(pokemon.url)
    pokeInfoResponse = pokeInfoResponse.data // Fix this

    // Set the redis cache is we fetched the pokemon info
    await setCache(pokemon.url, pokeInfoResponse)
  }
  return pokeInfoResponse
})

const test = await Promise.all(pokemonListWithPokemonInfo)