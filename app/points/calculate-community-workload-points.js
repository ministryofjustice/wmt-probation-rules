const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (communityTiers, caseTypeWeightings, commTierCPEnabled, commTier3AEnabled) {
  var communityWorkloadPoints = 0
  communityTiers.getAsList().forEach(function (tierCount) {
    communityWorkloadPoints += calculatePointsForTier(tierCount, communityTiers.points, caseTypeWeightings)
  }, this)
  if (commTierCPEnabled) {
    communityWorkloadPoints += calculatePointsForTier(communityTiers.a1, communityTiers.points, caseTypeWeightings.commTierCPWeighting)
  }
  if (commTier3AEnabled) {
    communityWorkloadPoints += calculatePointsForTier(communityTiers.a3, communityTiers.points, caseTypeWeightings)
  }
  // TODO: Add special calculations
  return communityWorkloadPoints
}
