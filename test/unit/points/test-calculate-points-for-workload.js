const expect = require('chai').expect
const calculateWorkloadPoints = require('../../../app/points/calculate-points-for-workload')
const pointsHelper = require('../../helpers/points-helper')
const Locations = require('../../../app/staging/constants/locations')

describe('points/calculate-points-for-workload', function () {
  describe('successful operation', function () {
    const workload = pointsHelper.getTestWorkloadObject()
    const caseTypeWeightings = pointsHelper.getCaseTypeWeightings()
    const t2aCaseTypeWeightings = pointsHelper.getCaseTypeWeightings()
    const armsCommunityPoints = 2 * 1 * 4
    const armsLicensePoints = 1 * 1 * 5
    const expectedArmsPoints = armsCommunityPoints + armsLicensePoints
    const expectedSdrPoints = 9 * 4
    const expectedSdrConversionPoints = 7 * 5
    const expectedParomsPoints = 6 * 8

    const result = calculateWorkloadPoints(workload, caseTypeWeightings, t2aCaseTypeWeightings)
    let expectedPoints = 0

    for (let i = 1; i < 11; i++) {
      expectedPoints += ((8 * i)) // - (1 * i * 0.9) - (2 * i * 0.8) - (3 * i * 0.7)) // all the tiers (non-t2a)
      expectedPoints += ((8 * i) - (1 * i * 1) - (2 * i * 0) - (3 * i * 1)) // all the tiers for t2a
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
    const caseTypeWeightings = pointsHelper.getCaseTypeWeightings()
    expect(function () { calculateWorkloadPoints(undefined, caseTypeWeightings) }).to.throw(Error)
  })

  it('should throw an error when caseTypeWeightings is undefined', function () {
    const workload = pointsHelper.getTestWorkloadObject(Locations.LICENSE)
    expect(function () { calculateWorkloadPoints(workload, undefined) }).to.throw(Error)
  })
})
