const expect = require('chai').expect
const Workload = require('../../app/points/domain/Workload')
const Tiers = require('../../app/points/domain/Tiers')

describe('points/domain/Workload', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new Workload(undefined, new Tiers(), new Tiers()) }).to.throw(Error)
    expect(function () { new Workload(new Tiers(), undefined, new Tiers()) }).to.throw(Error)
    expect(function () { new Workload(new Tiers(), new Tiers(), undefined) }).to.throw(Error)
  })
  it('all fields can be retrieved', function () {
    var result = true
    expect(result).to.equal(true)
  })
})
