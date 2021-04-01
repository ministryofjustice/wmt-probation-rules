/* eslint-disable no-new */
/* eslint-disable new-parens */
const expect = require('chai').expect
const Tiers = require('../../../../app/points/domain/tiers')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Tiers', function () {
  const NUMBER_OF_TIERS_IN_WORKLOAD = 17
  const validArgumentList = [Locations.COMMUNITY]

  for (let i = 0; i < NUMBER_OF_TIERS_IN_WORKLOAD; i++) {
    validArgumentList.push(pointsHelper.getTierCountsObject(i))
  }

  it('throws an error when any argument undefined', function () {
    for (let j = 1; j < validArgumentList.length; j++) {
      // slice(0) can be used in order to deep copy arrays
      const args = validArgumentList.slice(0)
      args[j] = undefined

      expect(function () {
        new Tiers(...args)
      }).to.throw(Error)
    }
  })

  it('all fields can be retrieved', function () {
    const tiers = new Tiers(...validArgumentList)
    expect(tiers.location).to.be.a('string')
    expect(tiers.untiered).to.be.an('object')
    expect(tiers.d0).to.be.an('object')
    expect(tiers.d1).to.be.an('object')
    expect(tiers.d2).to.be.an('object')
    expect(tiers.d3).to.be.an('object')
    expect(tiers.c0).to.be.an('object')
    expect(tiers.c1).to.be.an('object')
    expect(tiers.c2).to.be.an('object')
    expect(tiers.c3).to.be.an('object')
    expect(tiers.b0).to.be.an('object')
    expect(tiers.b1).to.be.an('object')
    expect(tiers.b2).to.be.an('object')
    expect(tiers.b3).to.be.an('object')
    expect(tiers.a0).to.be.an('object')
    expect(tiers.a1).to.be.an('object')
    expect(tiers.a2).to.be.an('object')
    expect(tiers.a3).to.be.an('object')
  })
})
