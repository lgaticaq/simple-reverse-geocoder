'use strict';

import lib from '../lib';
import {expect} from 'chai';

describe('simple-reverse-geocoder', () => {
  describe('getAddress', () => {
    it('should return a valid address', (done) => {
      const loc = {type: 'Point', coordinates: [-70.5171743, -33.3608387]};
      lib.setCache();
      lib.getAddress(loc).then(data => {
        expect(data).to.eql('Del Candil 665-701, Lo Barnechea');
        done();
      }).catch(err => {
        expect(err).to.be.undefined;
        done();
      });
    });

    it('should return a valid address', (done) => {
      lib.getFromCache(-33.3608387, -70.5171743).then(reply => {
        expect(reply).to.eql('Del Candil 665-701, Lo Barnechea');
        done();
      }).catch(err => {
        expect(err).to.be.undefined;
        done();
      });
    });
  });

  after(() => {
    lib.clearCache(-33.3608387, -70.5171743);
  });
});
