const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (custodyTiers, caseTypeWeightings) {
  var custodyWorkloadPoints = 0
  custodyTiers.getTierCountsAsList().forEach(function (tier) {
    custodyWorkloadPoints += calculatePointsForTier(tier.tierCount, tier.points, caseTypeWeightings)
  }, this)

  return custodyWorkloadPoints
}
