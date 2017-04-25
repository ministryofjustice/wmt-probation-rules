const expect = require('chai').expect
const DefaultNominalTargets = require('../../../../app/points/domain/default-nominal-targets')

describe('points/domain/DefaultNominalTargets', function () {
  it('thows an error when any property is undefined', function () {
    expect(function () { new DefaultNominalTargets(undefined, 1) }).to.throw(Error)
    expect(function () { new DefaultNominalTargets(1, undefined) }).to.throw(Error)
  })
  it('thows an error when any property is not a number', function () {
    expect(function () { new DefaultNominalTargets('String', 1) }).to.throw(Error)
    expect(function () { new DefaultNominalTargets(1, 'String') }).to.throw(Error)
  })
  it('doesn\'t thow an error when all properties are numbers', function () {
    expect(function () { new DefaultNominalTargets(1, 1) }).not.to.throw(Error)
  })
  it('correctly retrieves all fields', function () {
    var defaultNominalTargets = new DefaultNominalTargets(1, 2)
    expect(defaultNominalTargets.pso).to.equal(1)
    expect(defaultNominalTargets.po).to.equal(2)
  })
})
