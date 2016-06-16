'use strict';

const nodeGeocoder = require('node-geocoder');
const Promise = require('bluebird');

let client;

const setCache = instance => {
  client = instance;
  Promise.promisifyAll(Object.getPrototypeOf(client));
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

const getCoordinates = loc => {
  return new Promise((resolve, reject) => {
    try {
      const lng = loc.coordinates[0];
      const lat = loc.coordinates[1];
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

const getAddress = loc => {
  return new Promise((resolve, reject) => {
    getCoordinates(loc).then(data => {
      const lng = data.lng;
      const lat = data.lat;
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
  if (client) client.del(`geocoder:${lat}:${lng}`);
};

module.exports = {
  setCache: setCache,
  getAddress: getAddress,
  getFromCache: getFromCache,
  clearCache: clearCache
};
