# simple-reverse-geocoder

[![npm version](https://img.shields.io/npm/v/simple-reverse-geocoder.svg)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![npm downloads](https://img.shields.io/npm/dm/simple-reverse-geocoder.svg)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![Build Status](https://img.shields.io/travis/lgaticaq/simple-reverse-geocoder.svg)](https://travis-ci.org/lgaticaq/simple-reverse-geocoder)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/simple-reverse-geocoder/master.svg)](https://coveralls.io/github/lgaticaq/simple-reverse-geocoder?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e70514e8e89c182b301d/maintainability)](https://codeclimate.com/github/lgaticaq/simple-reverse-geocoder/maintainability)
[![dependency Status](https://img.shields.io/david/lgaticaq/simple-reverse-geocoder.svg)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/simple-reverse-geocoder.svg)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=devDependencies)

> Get address from a point

## Installation

```bash
npm i -S simple-reverse-geocoder
```

## Use

[Try on Tonic](https://tonicdev.com/npm/simple-reverse-geocoder)
```js
const rg = require('simple-reverse-geocoder')

const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
rg.getAddress(loc).then(console.log); // 'Del Candil 665-701, Lo Barnechea'

// Add redis cache
rg.setCache('redis://localhost:6379/0')
const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
rg.getAddress(loc).then(console.log); // 'Del Candil 665-701, Lo Barnechea'

// Add google apikey
const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
const apiKey = 'myApiKey'
rg.getAddress(loc, apiKey).then(console.log); // 'Del Candil 665-701, Lo Barnechea'
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
