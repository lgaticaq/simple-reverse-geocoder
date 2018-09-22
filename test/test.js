'use strict'

const { describe, it, before, after } = require('mocha')
const { expect } = require('chai')
const mock = require('mock-require')

const nodeGeocoderStub = options => {
  return {
    options: options,
    reverse: data => {
      return new Promise((resolve, reject) => {
        if (data.lon === -70.5171743 && data.lat - 33.3608387) {
          resolve([{ formattedAddress: 'Del Candil 665-701, Lo Barnechea' }])
        } else if (data.lon === -70 && data.lat - 33) {
          resolve([])
        } else if (options.apiKey === '1234567') {
          resolve([{ formattedAddress: 'Del Candil 702-765, Lo Barnechea' }])
        } else {
          reject(
            new Error(
              'Status is OVER_QUERY_LIMIT. You have exceeded your daily request quota for this API. We recommend registering for a key at the Google Developers Console: https://console.developers.google.com/apis/credentials?project=_'
            )
          )
        }
      })
    }
  }
}

mock('node-geocoder', nodeGeocoderStub)

const rg = require('../src')

describe('simple-reverse-geocoder', () => {
  describe('without cache', () => {
    describe('getAddress', () => {
      it('should return a valid address', done => {
        const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
        rg
          .getAddress(loc)
          .then(data => {
            expect(data).to.eql('Del Candil 665-701, Lo Barnechea')
            done()
          })
          .catch(done)
      })
    })

    describe('clearCache', () => {
      it('should return undefined', done => {
        rg
          .clearCache(-33.3608387, -70.5171743)
          .then(data => {
            expect(data).to.be.an('undefined')
            done()
          })
          .catch(done)
      })
    })
  })

  describe('with cache', () => {
    before(() => {
      rg.setCache()
    })

    describe('getAddress', () => {
      it('should return a valid address', done => {
        const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
        rg
          .getAddress(loc)
          .then(data => {
            expect(data).to.eql('Del Candil 665-701, Lo Barnechea')
            done()
          })
          .catch(done)
      })

      it('should return a valid address from cache', done => {
        const loc = { type: 'Point', coordinates: [-70.5171743, -33.3608387] }
        rg
          .getAddress(loc)
          .then(data => {
            expect(data).to.eql('Del Candil 665-701, Lo Barnechea')
            done()
          })
          .catch(done)
      })

      it('should return a null', done => {
        const loc = { type: 'Point', coordinates: [-70, -33] }
        rg
          .getAddress(loc)
          .then(data => {
            expect(data).to.eql(null)
            done()
          })
          .catch(done)
      })

      it('should return a valid address with valid apiKey', done => {
        const loc = { type: 'Point', coordinates: [-70.5271743, -33.3708387] }
        rg
          .getAddress(loc, '1234567')
          .then(data => {
            expect(data).to.eql('Del Candil 702-765, Lo Barnechea')
            done()
          })
          .catch(done)
      })

      it('should return a error api key', done => {
        const loc = { type: 'Point', coordinates: [-70.5371743, -33.3808387] }
        rg.getAddress(loc, '1111111').catch(err => {
          expect(err).to.be.an('error')
          done()
        })
      })

      it('should return a error loc', done => {
        const loc = {}
        rg.getAddress(loc).catch(err => {
          expect(err).to.be.an('error')
          done()
        })
      })
    })

    after(() => {
      rg.clearCache(-33.3608387, -70.5171743)
      rg.clearCache(-33.3708387, -70.5271743)
      rg.clearCache(-33.3808387, -70.5371743)
      rg.clearCache(-33, -70)
    })
  })
})
