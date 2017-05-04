const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (communityTiers, caseTypeWeightings, commTierCPEnabled, commTier3AEnabled) {
  var communityWorkloadPoints = 0
  communityTiers.getTierCountsAsList().forEach(function (tier) {
    communityWorkloadPoints += calculatePointsForTier(tier.tierCount, tier.points, caseTypeWeightings)
  }, this)
  if (commTierCPEnabled) {
    communityWorkloadPoints += calculatePointsForTier(communityTiers.a1.tierCount, communityTiers.a1.points, caseTypeWeightings.commTierCPWeighting)
  }
  if (commTier3AEnabled) {
    communityWorkloadPoints += calculatePointsForTier(communityTiers.a3.tierCount, communityTiers.a3.points, caseTypeWeightings)
  }
  return communityWorkloadPoints
}
