const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (tiers, caseTypeWeightings) {
  var tierTotalCount = 0
  var tierNumber = 0
  tiers.forEach(function (tier) {
    tierTotalCount += calculatePointsForTier(tier.tierCounts, caseTypeWeightings.pointsConfiguration[tierNumber], caseTypeWeightings)
    tierNumber++
  })
  return tierTotalCount
}
