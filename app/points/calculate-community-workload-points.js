const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

module.exports = function (communityTiers, caseTypeWeightings) {
  var communityWorkloadPoints = calculatePointsForTier(communityTiers.tierCounts, communityTiers.points, caseTypeWeightings)
  // TODO: Add config value check for CP calculations
  var setting = true
  if (setting) {
    communityWorkloadPoints += calculateCommunityTierCP(0, 1, 1)
  }
  // TODO: Add config value check for 3D calculations
  var comtier3D = true
  if (comtier3D) {
    communityWorkloadPoints += calculateCommunityTier3D(0, 1, 1, comtier3D)
  }
  // TODO: Add special calculations
  return communityWorkloadPoints
}

var calculateCommunityTierCP = function (count, points, weighting) {
  return count * (points * weighting)
}

var calculateCommunityTier3D = function (count, points, comtier3D) {
  var weighting = 0

  return count * (points * weighting)
}
