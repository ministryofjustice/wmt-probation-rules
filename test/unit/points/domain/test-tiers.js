const expect = require('chai').expect
const Tiers = require('../../../../app/points/domain/tiers')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Tiers', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () {
      new Tiers(Locations.COMMUNITY,
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      undefined,
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject(),
      pointsHelper.getTestTiersObject())
    }).to.throw(Error)
  })
})
