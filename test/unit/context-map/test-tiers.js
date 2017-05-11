const expect = require('chai').expect
const Tiers = require('../../../app/points/domain/tiers')
const mapper = require('../../../app/context-map/tiers')
const pointsHelper = require('../../../test/helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('context-map/tiers', function () {
  it('should map to workload', function () {
    var output = mapper(Locations.COMMUNITY,
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject(),
                        pointsHelper.getTestTierObject())
    expect(output).to.be.an.instanceOf(Tiers)
  })
})
