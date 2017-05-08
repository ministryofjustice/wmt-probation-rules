const expect = require('chai').expect
const calculateTotalWorkloadPoints = require('../../../app/points/calculate-total-workload-points')
const pointsHelper = require('../../helpers/points-helper')

describe('points/calculate-total-workload-points', function () {
  it('succesfully calculates the total points with weightings and flags set', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    var weightings = pointsHelper.getWeightings()

    var result = calculateTotalWorkloadPoints(workloadObject, weightings, true, true)

    expect(result).to.equal(28)
  })

  it('succesfully calculates the total points with tier3a off', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    var weightings = pointsHelper.getWeightings()

    var result = calculateTotalWorkloadPoints(workloadObject, weightings, true, false)

    expect(result).to.equal(28)
  })

  it('succesfully calculates the total points with tierCP off', function () {
    var workloadObject = pointsHelper.getTestWorkloadObject()
    var weightings = pointsHelper.getWeightings()

    var result = calculateTotalWorkloadPoints(workloadObject, weightings, false, true)

    expect(result).to.equal(24)
  })
})
