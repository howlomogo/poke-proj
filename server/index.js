const express = require('express')
const axios = require('axios')
const cors = require('cors')

/**
 * Controllers
 */
const { getPokemonById } = require('./controllers/getPokemonById')
const { getPokemonList } = require('./controllers/getPokemonList')
const { getFilteredPokemonList } = require('./controllers/getFilteredPokemonList')
const { getResults } = require('./controllers/getResults')
const { getPokemonTypeOptions } = require('./controllers/getPokemonTypeOptions')
/**
 * Set up
 */
const PORT = 3000
const app = express()
app.use(cors())

/**
 * Routes
*/

app.get('/options-types', getPokemonTypeOptions)


app.get('/pokemon', getPokemonList)
app.get('/pokemon/:name', getPokemonById)
app.get('/filtered', getFilteredPokemonList)


// Route for handling anything that returns pokemon results array
app.get('/results', getResults)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
