const expect = require('chai').expect
const TierCounts = require('../../../../app/points/domain/tier-counts')

describe('points/domain/TierCounts', function () {
  it('thows an error when any property is undefined', function () {
    expect(function () { new TierCounts(undefined, 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, undefined, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, undefined, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, undefined) }).to.throw(Error)
  })
  it('thows an error when any property is not a number', function () {
    expect(function () { new TierCounts('String', 1, 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 'String', 1, 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 'String', 1) }).to.throw(Error)
    expect(function () { new TierCounts(1, 1, 1, 'String') }).to.throw(Error)
  })
  it('thows an error when the combined case types are greater than the total', function () {
    expect(function () { new TierCounts(1, 1, 1, 1) }).to.throw(Error)
  })
  it('doesn\'t throw an error when the combined case types are the same as the total', function () {
    expect(function () { new TierCounts(3, 1, 1, 1) }).not.to.throw(Error)
  })
  it('doesn\'t throw an error when the combined case types are greater than the total', function () {
    expect(function () { new TierCounts(5, 1, 1, 1) }).not.to.throw(Error)
  })
  it('all fields can be retrieved', function () {
    var tierCounts = new TierCounts(5, 1, 1, 1)
    expect(tierCounts.total).to.equal(5)
    expect(tierCounts.warrants).to.equal(1)
    expect(tierCounts.unpaidWork).to.equal(1)
    expect(tierCounts.overdueTermination).to.equal(1)
  })
})