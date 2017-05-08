const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (tiers, caseTypeWeightings) {
  var tierTotalCount = 0
  tiers.forEach(function (tier) {
    tierTotalCount += calculatePointsForTier(tier.tierCount, tier.points, caseTypeWeightings)
  })
  return tierTotalCount
}
