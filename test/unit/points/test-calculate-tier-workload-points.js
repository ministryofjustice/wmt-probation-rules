const expect = require('chai').expect
const calculateTierWorkloadPoints = require('../../../app/points/calculate-tier-workload-points')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-community-tier-workload-points', function () {
  it('should calculate the value without error', function () {
    var tiersObject = pointsHelper.getTestTiersObject(Locations.COMMUNITY)
    var caseTypeWeightings = pointsHelper.getWeightings()

    var result = calculateTierWorkloadPoints(tiersObject, caseTypeWeightings)
    expect(result).to.equal(8)
  })

  it('should calculate the value without error', function () {
    var tiersObject = pointsHelper.getTestTiersObject(Locations.CUSTODY)
    var caseTypeWeightings = pointsHelper.getWeightings()

    var result = calculateTierWorkloadPoints(tiersObject, caseTypeWeightings)
    expect(result).to.equal(8)
  })

  it('should calculate the value without error', function () {
    var tiersObject = pointsHelper.getTestTiersObject(Locations.LICENSE)
    var caseTypeWeightings = pointsHelper.getWeightings()

    var result = calculateTierWorkloadPoints(tiersObject, caseTypeWeightings)
    expect(result).to.equal(8)
  })
})
