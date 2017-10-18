const expect = require('chai').expect
const calculateWorkloadPoints = require('../../../app/points/calculate-points-for-workload')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-points-for-workload', function () {
  describe('successful operation', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    var caseTypeWeightings = pointsHelper.getCaseTypeWeightings()
    var armsCommunityPoints = 2 * 4 * 4
    var armsLicensePoints = 1 * 2 * 5
    var expectedArmsPoints = armsCommunityPoints + armsLicensePoints
    var expectedSdrPoints = 9 * 4
    var expectedSdrConversionPoints = 7 * 5
    var expectedParomsPoints = 6 * 8

    var result = calculateWorkloadPoints(workload, caseTypeWeightings)
    var expectedPoints = 0

    for (var i = 1; i < 8; i++) {
      expectedPoints += ((8 * i) - (1 * i * 0.9) - (2 * i * 0.8) - (3 * i * 0.7)) // all the tiers
    }

    expectedPoints = expectedPoints * 3 // in each location
    expectedPoints += expectedArmsPoints
    expectedPoints += expectedSdrPoints
    expectedPoints += expectedSdrConversionPoints
    expectedPoints += expectedParomsPoints

    it('should calculate total points correctly', function () {
      expect(result.total).to.equal(expectedPoints)
    })

    it('should calculate arms points correctly', function () {
      expect(result.armsPoints).to.equal(expectedArmsPoints)
    })

    it('should calculate sdr points correctly', function () {
      expect(result.sdrPoints).to.equal(expectedSdrPoints)
    })

    it('should calculate sdr conversion points correctly', function () {
      expect(result.sdrConversionPoints).to.equal(expectedSdrConversionPoints)
    })

    it('should calculate paroms points correctly', function () {
      expect(result.paromsPoints).to.equal(expectedParomsPoints)
    })
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
