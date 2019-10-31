 /* eslint-disable no-new */
 /* eslint-disable new-parens */
const expect = require('chai').expect
const Tiers = require('../../../../app/points/domain/tiers')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Tiers', function () {
  const NUMBER_OF_TIERS_IN_WORKLOAD = 11
  var validArgumentList = [Locations.COMMUNITY]

  for (var i = 0; i < NUMBER_OF_TIERS_IN_WORKLOAD; i++) {
    validArgumentList.push(pointsHelper.getTierCountsObject(i))
  }

  it('throws an error when any argument undefined', function () {
    for (var j = 1; j < validArgumentList.length; j++) {
      // slice(0) can be used in order to deep copy arrays
      var args = validArgumentList.slice(0)
      args[j] = undefined

      expect(function () {
        new Tiers(...args)
      }).to.throw(Error)
    }
  })

  it('all fields can be retrieved', function () {
    var tiers = new Tiers(...validArgumentList)
    expect(tiers.location).to.be.a('string')
    expect(tiers.untiered).to.be.an('object')
    expect(tiers.g).to.be.an('object')
    expect(tiers.f).to.be.an('object')
    expect(tiers.e).to.be.an('object')
    expect(tiers.d2).to.be.an('object')
    expect(tiers.d1).to.be.an('object')
    expect(tiers.c2).to.be.an('object')
    expect(tiers.c1).to.be.an('object')
    expect(tiers.b2).to.be.an('object')
    expect(tiers.b1).to.be.an('object')
    expect(tiers.a).to.be.an('object')
  })
})
