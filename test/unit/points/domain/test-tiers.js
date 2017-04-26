const expect = require('chai').expect
const Tiers = require('../../../../app/points/domain/tiers')
const Tier = require('../../../../app/points/domain/Tier')

describe('points/domain/Tiers', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new Tiers() }).to.throw(Error)
  })
})
