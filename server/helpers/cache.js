const redis = require('redis')
const REDIS_PORT = 6379

const client = redis.createClient(REDIS_PORT)

exports.setCache = async function setCache(key, data) {
  return new Promise(resolve => {
    // Stringify response to be able to set in redis
    const stringifiedResponse = JSON.stringify(data)
    
    // Cache data to redis
    // console.log(`Setting cache for ${key}...`)
    client.setex(key, 3600, stringifiedResponse, (err) => {
      if(err) {
        console.log(`There was an error SETTING cache for ${key} - ${err}`)
        throw err
      }
      resolve()
    })
  })
}

// Checks / returns parsed json data from redis cache if key has already been cached
exports.getCache = async function getCache(key) {
  return new Promise(resolve => {
    client.get(key, (err, data) => {
      if(err) {
        // console.log(`There was an error GETTING cache for ${key} - ${err}`)
        throw err
      }
  
      if(data !== null) {
        // console.log(`Returning cached data for ${key}...`)
        resolve(JSON.parse(data))
      } else {
        // console.log(`${key} not cached...`)
        resolve(null)
      }
    })
  })
}