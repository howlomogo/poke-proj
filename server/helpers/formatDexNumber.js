exports.formatDexNumber = function formatDexNumber(id) {
  let pokedexNumber =  '' + id;
  if (pokedexNumber < 10) {
    pokedexNumber = '00' + pokedexNumber
  } else if (pokedexNumber >= 10 && pokedexNumber < 100) {
    pokedexNumber = '0' + pokedexNumber
  }

  return `#${pokedexNumber}`
}