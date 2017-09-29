const expect = require('chai').expect
const calculateWorkloadPoints = require('../../../app/points/calculate-points-for-workload')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-points-for-workload', function () {
  it('should calculate the value without error', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    var caseTypeWeightings = pointsHelper.getCaseTypeWeightings()

    var result = calculateWorkloadPoints(workload, caseTypeWeightings)
    var expectedPoints = 0
    for (var i = 1; i < 8; i++) {
      expectedPoints += ((8 * i) - (1 * i) - (2 * i * 2) - (3 * i * 3)) // all the tiers
    }
    expectedPoints = expectedPoints * 3 // in each location

    expect(result).to.equal(expectedPoints)
  })

  it('should throw an error when Tiers is undefined', function () {
    var caseTypeWeightings = pointsHelper.getCaseTypeWeightings()
    expect(function () { calculateWorkloadPoints(undefined, caseTypeWeightings) }).to.throw(Error)
  })

  it('should throw an error when caseTypeWeightings is undefined', function () {
    var workload = pointsHelper.getTestWorkloadObject(Locations.LICENSE)
    expect(function () { calculateWorkloadPoints(workload, undefined) }).to.throw(Error)
  })
})
