/* eslint-disable no-new */
const expect = require('chai').expect
const CaseTypeWeightings = require('../../../../app/points/domain/case-type-weightings')

describe('points/domain/case-type-weightings', function () {
  it('throws an error when any property is undefined', function () {
    expect(function () { new CaseTypeWeightings(undefined, 1, 1) }).to.throw(Error)
    expect(function () { new CaseTypeWeightings(1, undefined, 1) }).to.throw(Error)
    expect(function () { new CaseTypeWeightings(1, 1, undefined) }).to.throw(Error)
  })
  it('throws an error when any property is a string', function () {
    expect(function () { new CaseTypeWeightings('input', 1, 1) }).to.throw(Error)
    expect(function () { new CaseTypeWeightings(1, 'input', 1) }).to.throw(Error)
    expect(function () { new CaseTypeWeightings(1, 1, 'input') }).to.throw(Error)
  })
  it('doesn\'t throw an error when all the parameters are numbers', function () {
    expect(function () { new CaseTypeWeightings(1, 1, 1) }).to.not.throw(Error)
  })
  it('can retrieve the correct value for the CP weighting when it is set', function () {
    var caseTypeWeightings = new CaseTypeWeightings(1, 1, 1, 1)
    expect(caseTypeWeightings.commTierCPWeighting).to.equal(1)
  })
  it('retrieves all values', function () {
    var caseTypeWeightings = new CaseTypeWeightings(1, 2, 3)
    expect(caseTypeWeightings.warrants).to.equal(1)
    expect(caseTypeWeightings.unpaidWork).to.equal(2)
    expect(caseTypeWeightings.overdueTermination).to.equal(3)
    expect(caseTypeWeightings.commTierCPWeighting).to.equal(0)
  })
})
