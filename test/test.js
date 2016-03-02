'use strict';

import {expect} from 'chai';
import redis from 'redis';
import rg from '../lib';

describe('simple-reverse-geocoder', () => {
  before(() => {
    const client = redis.createClient();
    rg.setCache(client);
  });

  describe('getAddress', () => {
    it('should return a valid address', (done) => {
      const loc = {type: 'Point', coordinates: [-70.5171743, -33.3608387]};
      rg.getAddress(loc).then(data => {
        expect(data).to.eql('Del Candil 665-701, Lo Barnechea');
        done();
      }).catch(err => {
        expect(err).to.be.undefined;
        done();
      });
    });

    it('should return a valid address from cache', (done) => {
      rg.getFromCache(-33.3608387, -70.5171743).then(reply => {
        expect(reply).to.eql('Del Candil 665-701, Lo Barnechea');
        done();
      }).catch(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });

  after(() => {
    rg.clearCache(-33.3608387, -70.5171743);
  });
});
