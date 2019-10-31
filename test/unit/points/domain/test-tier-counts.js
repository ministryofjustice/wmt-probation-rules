/* eslint-disable no-new */
const expect = require('chai').expect
const TierCounts = require('../../../../app/points/domain/tier-counts')

describe('points/domain/TierCounts', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new TierCounts(undefined, 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, undefined, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, undefined, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, undefined, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, undefined, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, 1, undefined, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, 1, 1, undefined) }).to.throw(Error)
  })
  it('throws an error when any property is not a number', function () {
    expect(function () { new TierCounts('String', 1, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 'String', 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 'String', 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 'String', 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, 'String', 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, 1, 'String', 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 1, 1, 1, 'String') }).to.throw(Error)

  })
  it('all fields can be retrieved', function () {
    var tierCounts = new TierCounts(5, 1, 1, 1, 1, 7, 0)
    expect(tierCounts.total).to.equal(5)
    expect(tierCounts.warrants).to.equal(1)
    expect(tierCounts.unpaidWork).to.equal(1)
    expect(tierCounts.overdueTermination).to.equal(1)
    expect(tierCounts.suspended).to.equal(1)
    expect(tierCounts.suspendedLifers).to.equal(7)
    expect(tierCounts.tierCode).to.equal(0)
  })
})
