const expect = require('chai').expect
const calculateWorkloadPoints = require('../../../app/points/calculate-workload-points')
const pointsHelper = require('../../helpers/points-helper')

describe('points/calculate-workload-points', function () {
  it('succesfully calculates the total points with weightings and flags set', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    var weightings = pointsHelper.getWeightings()

    var result = calculateWorkloadPoints(workloadObject, weightings)

    expect(result).to.equal(240)
  })
  it('should throw an error when the workload object is undefined', function () {
    var weightings = pointsHelper.getWeightings()
    expect(function () { calculateWorkloadPoints(undefined, weightings) }).to.throw(Error)
  })
  it('should throw an error when the workload object is undefined', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    expect(function () { calculateWorkloadPoints(workloadObject, undefined) }).to.throw(Error)
  })
})
