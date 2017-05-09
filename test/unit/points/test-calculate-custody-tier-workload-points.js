const expect = require('chai').expect
const calculateCustodyWorkloadPoints = require('../../../app/points/calculate-custody-tier-workload-points')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-custody-tier-workload-points', function () {
  it('should calculate the value without error', function () {
    var tiersObject = pointsHelper.getTestTiersObject(Locations.CUSTODY)
    var weightings = pointsHelper.getWeightings()

    var result = calculateCustodyWorkloadPoints(tiersObject, weightings)
    expect(result).to.equal(8)
  })
})
