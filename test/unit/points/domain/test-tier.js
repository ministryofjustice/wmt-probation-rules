 /* eslint-disable no-new */
const expect = require('chai').expect
const Tier = require('../../../../app/points/domain/tier')
const TierCount = require('../../../../app/points/domain/tier-counts')

describe('points/domain/Tier', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new Tier(undefined) }).to.throw(Error)
  })
  it('can retrieve points when they are defined', function () {
    var tier = new Tier(new TierCount(4, 1, 1, 1, 1, 7))
    expect(tier.tierCounts).to.be.an('object')
  })
})
