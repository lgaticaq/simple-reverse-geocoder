'use strict'

const nodeGeocoder = require('node-geocoder')
const Redis = require('ioredis')

let client

/**
 * Set client Redis for cache results
 * @param  {String} uri Redis connection string. Ex redis://user:pass@host:port/db
 * @return {Void}
 */
const setCache = uri => {
  client = new Redis(uri)
}

/**
 * Get address from coordinates
 * @param  {Number}               lat    Latitude
 * @param  {Number}               lng    Longitude
 * @param  {String|Null}          apiKey Google api key
 * @return {Promise<String|Null>}        Address
 */
const getReverse = (lat, lng, apiKey = null) => {
  const options = { provider: 'google', httpAdapter: 'https' }
  if (apiKey) options.apiKey = apiKey
  const geocoder = nodeGeocoder(options)
  return geocoder.reverse({ lat: lat, lon: lng }).then(res => {
    if (res.length === 0) return null
    return res[0].formattedAddress
      .split(',')
      .map(x => x.trim())
      .slice(0, 2)
      .join(', ')
  })
}

/**
 * Get latitude and longitude from GeoJson
 * @param  {Object}          loc GeoJson
 * @return {Promise<Object>}     Object with latitude and longitude
 */
const getCoordinates = loc => {
  return new Promise((resolve, reject) => {
    try {
      const lng = loc.coordinates[0]
      const lat = loc.coordinates[1]
      resolve({ lng: lng, lat: lat })
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * Get address from redis
 * @param  {Number}               lat Latitude
 * @param  {Number}               lng Longitude
 * @return {Promise<String|Null>}     Address
 */
const getFromCache = (lat, lng) => client.get(`geocoder:${lat}:${lng}`)

/**
 * Get address from google or cache if seted
 * @param  {Object}               loc    GeoJson
 * @param  {String|Null}          apiKey Google api key
 * @return {Promise<String|Null>}        Address
 */
const getAddress = (loc, apiKey = null) => {
  return getCoordinates(loc).then(data => {
    const lng = data.lng
    const lat = data.lat
    if (!client) return getReverse(lat, lng)
    return getFromCache(lat, lng).then(reply => {
      if (reply) return reply
      return getReverse(lat, lng, apiKey).then(address => {
        if (!address) return null
        return client.set(`geocoder:${lat}:${lng}`, address).then(() => {
          return address
        })
      })
    })
  })
}

/**
 * Clear cache for a loc
 * @param  {Number}  lat Latitude
 * @param  {Number}  lng Longitude
 * @return {Promise}     Redis del command
 */
const clearCache = (lat, lng) => {
  if (client) return client.del(`geocoder:${lat}:${lng}`)
  return Promise.resolve()
}

module.exports = {
  setCache: setCache,
  getAddress: getAddress,
  getFromCache: getFromCache,
  clearCache: clearCache
}
