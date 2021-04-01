const expect = require('chai').expect
const locations = require('../../../../app/staging/constants/locations')
const stagingHelper = require('../../../helpers/staging-helper')

describe('points/domain/staging/test-tiers', function () {
  it('should allow all fields to be retrieved', function () {
    const location = locations.COMMUNITY
    const tiers = stagingHelper.getTestTiers(location)
    expect(tiers.location).to.equal(locations.COMMUNITY)
    expect(tiers.untiered).to.be.a('string')
    expect(tiers.d0).to.be.a('string')
    expect(tiers.d1).to.be.a('string')
    expect(tiers.d2).to.be.a('string')
    expect(tiers.d3).to.be.a('string')
    expect(tiers.c0).to.be.a('string')
    expect(tiers.c1).to.be.a('string')
    expect(tiers.c2).to.be.a('string')
    expect(tiers.c3).to.be.a('string')
    expect(tiers.b0).to.be.a('string')
    expect(tiers.b1).to.be.a('string')
    expect(tiers.b2).to.be.a('string')
    expect(tiers.b3).to.be.a('string')
    expect(tiers.a0).to.be.a('string')
    expect(tiers.a1).to.be.a('string')
    expect(tiers.a2).to.be.a('string')
    expect(tiers.a3).to.be.eql(null)
  })
})
