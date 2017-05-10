const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (tiers, caseTypeWeightings) {
  var tierTotalCount = 0
  tiers.forEach(function (tier) {
    tierTotalCount += calculatePointsForTier(tier.tierCounts, tier.points, caseTypeWeightings)
  })
  return tierTotalCount
}
