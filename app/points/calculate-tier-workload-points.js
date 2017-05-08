const calculateTierPoints = require('../../app/points/calculate-tier-points')

module.exports = function (tiers, caseTypeWeightings) {
  var tierList = tiers.getTiersAsList()
  var tiersWorkloadPoints = calculateTierPoints(tierList, caseTypeWeightings)
  return tiersWorkloadPoints
}
