const calculateTierPoints = require('../../app/points/calculate-tier-points')

module.exports = function (communityTiers, caseTypeWeightings) {
  var tierList = communityTiers.getTiersAsList()
  var communityWorkloadPoints = calculateTierPoints(tierList, caseTypeWeightings)
  return communityWorkloadPoints
}
