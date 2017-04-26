const expect = require('chai').expect
const DestinationTier = require('../../../app/points/domain/tier')
const mapper = require('../../../app/context-map/tier')

describe('context-map/tier', function () {
  describe('valid states', function () {
    it('returns an instance of points/tier', function () {
      var output = mapper(4, 1, 1, 1, 1)
      expect(output).to.be.an.instanceof(DestinationTier)
    })
  })
  describe('invalid states', function () {
    it('uses TierCount\'s validation', function () {
      expect(function () { mapper(4, null, 1, 1, 1) }).to.throw(Error)
    })
    it('uses points/domain/Tier\'s validation', function () {
      expect(function () { mapper(4, 1, 1, 1, undefined) }).to.throw(Error)
    })
  })
})
