/* eslint-disable no-new */
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
  it('all fields can be retrieved', function () {
    var tiers = pointsHelper.getTestTiersObject(Locations.COMMUNITY)
    expect(tiers.location).to.be.a('string')
    expect(tiers.d2).to.be.an('object')
    expect(tiers.d1).to.be.an('object')
    expect(tiers.c2).to.be.an('object')
    expect(tiers.c1).to.be.an('object')
    expect(tiers.b2).to.be.an('object')
    expect(tiers.b1).to.be.an('object')
    expect(tiers.a).to.be.an('object')
  })
})
