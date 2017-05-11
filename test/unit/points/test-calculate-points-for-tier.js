const TierCounts = require('../../../app/points/domain/tier-counts')
const CaseTypeWeightings = require('../../../app/points/domain/case-type-weightings')

const expect = require('chai').expect
const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

describe('points/calculate-points-for-tier', function () {
  var tierCounts
  var points
  var caseTypeWeightings

  beforeEach(function () {
    tierCounts = new TierCounts(0, 0, 0, 0)
    points = 10
    caseTypeWeightings = new CaseTypeWeightings(0, 0, 0)
  })

  it('multiplies total case count for a tier with the points for that tier', function () {
    tierCounts = new TierCounts(10, 0, 0, 0)
    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(100)
  })

  it('reduces the tierPoints by the warrants weighting multiplied by the warrants case count', function () {
    tierCounts = new TierCounts(10, 10, 0, 0)
    caseTypeWeightings = new CaseTypeWeightings(1, 0, 0)

    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(0)
  })

  it('reduces the tierPoints by the unpaidWork weighting multiplied by the unpaidWork case count', function () {
    tierCounts = new TierCounts(10, 0, 10, 0)
    caseTypeWeightings = new CaseTypeWeightings(0, 1, 0)

    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(0)
  })

  it('reduces the tierPoints by the overdueTermination weighting multiplied by the overdueTermination case count', function () {
    tierCounts = new TierCounts(10, 0, 0, 10)
    caseTypeWeightings = new CaseTypeWeightings(0, 0, 1)

    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(0)
  })

  it('reduces the tierPoints by each case type', function () {
    tierCounts = new TierCounts(10, 1, 1, 1)
    caseTypeWeightings = new CaseTypeWeightings(1, 1, 1)
    points = 1

    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(7)
  })

  it('reduces the tierPoints by each case type when decimal numbers are used', function () {
    tierCounts = new TierCounts(10, 1, 1, 1)
    caseTypeWeightings = new CaseTypeWeightings(0.25, 0.5, 0.5)
    points = 1

    var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
    expect(tierPoints).to.equal(8.75)
  })
  it('should throw an error when tierCounts is undefined is undefined', function () {
    expect(function () { calculatePointsForTier(undefined, points, caseTypeWeightings) }).to.throw(Error)
  })
})
