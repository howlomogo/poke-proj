const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redis = require('redis')

const REDIS_PORT = 6379
const PORT = 3000

const client = redis.createClient(REDIS_PORT)

const app = express()

app.use(cors())

// Is request already cached, if not fetch data otherwise return cached data
function getCache(req, res, next) {
  let key = req.originalUrl || req.url

  client.get(key, (err, data) => {
    if(err) throw err

    if(data !== null) {
      console.log('Sending cached data!')
      res.send(JSON.parse(data))
    } else {
      console.log('Data NOT cached, fetching from API!')
      // Send url to use as cache key
      res.locals.cacheKey = key
      next()
    }
  })
}

function setCache(key, data) {
  // Stringify response to be able to set in redis
  const stringifiedResponse = JSON.stringify(data)

  // Cache data to redis
  client.setex(key, 3600, stringifiedResponse)
}

async function getPokemonList(req, res) {
  try {
    const { limit, offset } = req.query

    const params = {
      ...limit && { limit },
      ...offset && { offset }
    }

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/', { params })
    setCache(res.locals.cacheKey, response.data)

    res.send(response.data)
  } catch(err) {
    res.sendStatus(500)
  }
}

async function getPokemonById(req, res) {
  try {
    const { id } = req.params

    // Fetch the data
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    setCache(res.locals.cacheKey, response.data)

    // We can just send back un-stringified version here
    res.send(response.data)
  } catch(err) {
    res.sendStatus(500)
  }
}

async function getAbilityList(req, res, next) {
  try {
    const { limit, offset } = req.query

    const params = {
      ...limit && { limit },
      ...offset && { offset }
    }

    const response = await axios.get('https://pokeapi.co/api/v2/ability/', { params })
    setCache(res.locals.cacheKey, response.data)

    res.send(response.data)
  } catch(err) {
    res.sendStatus(500)
  }
}

async function getAbility(req, res, next) {
  try {
    const { id } = req.params

    const response = await axios.get(`https://pokeapi.co/api/v2/ability/${id}`)
    setCache(res.locals.cacheKey, response.data)

    res.send(response.data)
  } catch(err) {
    res.sendStatus(500)
  }
}


// Routes - (id generally can be id or name)
app.get('/pokemon', getCache, getPokemonList)

app.get('/pokemon/:id', getCache, getPokemonById)

app.get('/ability', getCache, getAbilityList)

app.get('/ability/:id', getCache, getAbility)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})