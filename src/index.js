'use strict';

import redisUrl from 'redis-url';
import nodeGeocoder from 'node-geocoder';
import Promise from 'bluebird';

let client;

const setCache = (uri) => {
  try {
    client = redisUrl.connect(uri);
    Promise.promisifyAll(Object.getPrototypeOf(client));
  } catch (err) {
    throw err;
  }
};

const getReverse = (lat, lng) => {
  return new Promise((resolve, reject) => {
    const geocoderProvider = 'google';
    const httpAdapter = 'http';
    const geocoder = nodeGeocoder(geocoderProvider, httpAdapter);
    geocoder.reverse({lat: lat, lon: lng}).then(res => {
      if (res.length === 0) resolve(null);
      resolve(res[0].formattedAddress.split(',').map(x => x.trim()).slice(0, 2).join(', '));
    }).catch(reject);
  });
};

const getCoordinates = (loc) => {
  return new Promise((resolve, reject) => {
    try {
      const [lng, lat] = loc.coordinates;
      resolve({lng: lng, lat: lat});
    } catch (err) {
      reject(err);
    }
  });
};

const getFromCache = (lat, lng) => {
  return new Promise((resolve, reject) => {
    client.getAsync(`geocoder:${lat}:${lng}`).then(resolve).catch(reject);
  });
};

const getAddress = (loc) => {
  return new Promise((resolve, reject) => {
    getCoordinates(loc).then(({lng, lat}) => {
      if (client) {
        getFromCache(lat, lng).then(reply => {
          if (reply) resolve(reply);
          getReverse(lat, lng).then(address => {
            if (!address) resolve(null);
            client.set(`geocoder:${lat}:${lng}`, address);
            resolve(address);
          }).catch(reject);
        }).catch(reject);
      } else {
        getReverse(lat, lng).then(resolve).catch(reject);
      }
    }).catch(reject);
  });
};

const clearCache = (lat, lng) => {
  if (client) {
    client.del(`geocoder:${lat}:${lng}`);
  }
};

module.exports = {
  setCache: setCache,
  getAddress: getAddress,
  getFromCache: getFromCache,
  clearCache: clearCache
};
