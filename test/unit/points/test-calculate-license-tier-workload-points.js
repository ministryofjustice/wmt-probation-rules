const expect = require('chai').expect
const calculateLienseWorkloadPoints = require('../../../app/points/calculate-license-tier-workload-points')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-license-tier-workload-points', function () {
  it('should calculate the value without error', function () {
    var tiersObject = pointsHelper.getTestTiersObject(Locations.LICENSE)
    var weightings = pointsHelper.getWeightings()

    var result = calculateLienseWorkloadPoints(tiersObject, weightings)
    expect(result).to.equal(8)
  })
})
