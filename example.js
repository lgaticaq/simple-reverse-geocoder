const rg = require('simple-reverse-geocoder')

const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
const address = await rg.getAddress(loc)
