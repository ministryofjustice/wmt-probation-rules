const TierCounts = require('../../../app/points/domain/tier-counts')
const CaseTypeWeightings = require('../../../app/points/domain/case-type-weightings')

const expect = require('chai').expect
const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

describe('points/calculate-points-for-tier', function() {
    it('works', function() {
        var tierCounts = new TierCounts(10, 0, 0, 0)
        var points = 10
        var caseTypeWeightings = new CaseTypeWeightings(0, 0, 0)
        var tierPoints = calculatePointsForTier(tierCounts, points, caseTypeWeightings)
        expect(tierPoints).to.equal(100)
    })
})
