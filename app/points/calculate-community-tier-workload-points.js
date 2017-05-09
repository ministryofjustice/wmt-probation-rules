const calculateWeightedPoints = require('../../app/points/calculate-weighted-points')
const calculateTierPoints = require('../../app/points/calculate-tier-points')

module.exports = function (communityTiers, caseTypeWeightings, commTierCPEnabled, commTier3AEnabled) {
  var communityWorkloadPoints = 0
  var tierList = communityTiers.getTiersAsList()
  if (commTier3AEnabled) {
    var index = tierList.indexOf('a1')
    tierList.splice(index, 1)
    tierList.push(communityTiers.a3)
  }
  communityWorkloadPoints = calculateTierPoints(tierList, caseTypeWeightings)
  if (commTierCPEnabled) {
    communityWorkloadPoints += calculateWeightedPoints(communityTiers.a1.tierCount.total, communityTiers.a1.points, 1)
  }
  return communityWorkloadPoints
}
