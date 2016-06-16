# simple-reverse-geocoder

[![npm version](https://img.shields.io/npm/v/simple-reverse-geocoder.svg?style=flat-square)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![npm downloads](https://img.shields.io/npm/dm/simple-reverse-geocoder.svg?style=flat-square)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![Build Status](https://img.shields.io/travis/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://travis-ci.org/lgaticaq/simple-reverse-geocoder)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/simple-reverse-geocoder/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/simple-reverse-geocoder?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/simple-reverse-geocoder)
[![dependency Status](https://img.shields.io/david/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=devDependencies)

> Get address from a point

## Installation

```bash
npm i -S simple-reverse-geocoder
```

## Use

[Try on Tonic](https://tonicdev.com/npm/simple-reverse-geocoder)
```js
import rg from 'simple-reverse-geocoder';

const loc = {type: 'Point', coordinates: [-70.5171743, -33.3608387]};
rg.getAddress(loc).then(console.log); // 'Del Candil 665-701, Lo Barnechea'

// Add redis cache
import redis from 'redis';

const client = redis.createClient();
rg.setCache(client);
const loc = {type: 'Point', coordinates: [-70.5171743, -33.3608387]};
rg.getAddress(loc).then(console.log); // 'Del Candil 665-701, Lo Barnechea'
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
