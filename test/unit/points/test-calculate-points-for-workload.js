const expect = require('chai').expect
const calculateWorkloadPoints = require('../../../app/points/calculate-points-for-workload')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-points-for-workload', function () {
  it('should calculate the value without error', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    var caseTypeWeightings = pointsHelper.getCaseTypeWeightings()

    var result = calculateWorkloadPoints(workload, caseTypeWeightings)
    expect(result).to.equal(336)
  })

  it('should throw an error when Tiers is undefined', function () {
    var caseTypeWeightings = pointsHelper.getWeightings()
    expect(function () { calculateWorkloadPoints(undefined, caseTypeWeightings) }).to.throw(Error)
  })

  it('should throw an error when caseTypeWeightings is undefined', function () {
    var workload = pointsHelper.getTestWorkloadObject(Locations.LICENSE)
    expect(function () { calculateWorkloadPoints(workload, undefined) }).to.throw(Error)
  })
})
