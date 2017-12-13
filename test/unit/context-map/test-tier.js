const expect = require('chai').expect
const DestinationTier = require('../../../app/points/domain/tier')
const mapper = require('../../../app/context-map/tier')

describe('context-map/tier', function () {
  describe('valid states', function () {
    it('returns an instance of points/tier', function () {
      var output = mapper(4, 1, 1, 1, 1)
      expect(output).to.be.an.instanceof(DestinationTier)
    })
    it('populates the points/tier object with the correct values', function () {
      var output = mapper(10, 1, 2, 3, 4)
      expect(output.tierCounts.total).to.equal(10)
      expect(output.tierCounts.warrants).to.equal(1)
      expect(output.tierCounts.unpaidWork).to.equal(2)
      expect(output.tierCounts.overdueTermination).to.equal(3)
      expect(output.tierCounts.suspended).to.equal(4)
    })
  })
  describe('invalid states', function () {
    it('uses TierCount\'s validation', function () {
      expect(function () { mapper(4, null, 1, 1, 1) }).to.throw(Error)
    })
    it('uses points/domain/Tier\'s validation', function () {
      expect(function () { mapper(4, 1, 1, undefined) }).to.throw(Error)
    })
  })
})
