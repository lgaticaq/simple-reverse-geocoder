# simple-reverse-geocoder

[![npm version](https://img.shields.io/npm/v/simple-reverse-geocoder.svg?style=flat-square)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![npm downloads](https://img.shields.io/npm/dm/simple-reverse-geocoder.svg?style=flat-square)](https://www.npmjs.com/package/simple-reverse-geocoder)
[![dependency Status](https://img.shields.io/david/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=dependencies)
[![Build Status](https://img.shields.io/travis/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://travis-ci.org/lgaticaq/simple-reverse-geocoder)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/simple-reverse-geocoder.svg?style=flat-square)](https://david-dm.org/lgaticaq/simple-reverse-geocoder#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/simple-reverse-geocoder](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/simple-reverse-geocoder?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Get address from a point

## Installation

```bash
npm i -S simple-reverse-geocoder
```

## Use

[Try on Tonic](https://tonicdev.com/npm/simple-reverse-geocoder)
```js
import meitrack from 'simple-reverse-geocoder'

const rg = require('simple-reverse-geocoder');

const loc = {type: 'Point', coordinates: [-70.5171743, -33.3608387]};
rg.getAddress(loc).then(console.log); // 'Del Candil 665-701, Lo Barnechea'
```
