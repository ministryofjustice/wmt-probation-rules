const expect = require('chai').expect
const calculateTotalWorkloadPoints = require('../../../app/points/calculate-total-workload-points')
const pointsHelper = require('../../helpers/points-helper')

describe('points/calculate-total-workload-points', function () {
  it('succesfully calculates the total points with weightings and flags set', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    var weightings = pointsHelper.getWeightings()

    var result = calculateTotalWorkloadPoints(workloadObject, weightings)

    expect(result).to.equal(240)
  })
})
