const expect = require('chai').expect
const locations = require('../../../../../app/points/constants/staging/locations')
const stagingHelper = require('../../../../helpers/staging-helper')

describe('points/domain/staging/test-tiers', function () {
  it('should allow all fields to be retrieved', function () {
    var location = locations.COMMUNITY
    var tiers = stagingHelper.getTestTiers(location)
    expect(tiers.location).to.equal(locations.COMMUNITY)
    expect(tiers.a).to.be.a('string')
    expect(tiers.b1).to.be.a('string')
    expect(tiers.b2).to.be.a('string')
    expect(tiers.c1).to.be.a('string')
    expect(tiers.c2).to.be.a('string')
    expect(tiers.d1).to.be.a('string')
    expect(tiers.d2).to.be.a('string')
    expect(tiers.untiered).to.be.a('string')
  })
})
