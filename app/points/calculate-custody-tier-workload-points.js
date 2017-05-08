const calculateTierPoints = require('../../app/points/calculate-tier-points')

module.exports = function (custodyTiers, caseTypeWeightings) {
  var custodyWorkloadPoints = calculateTierPoints(custodyTiers.getTiersAsList(), caseTypeWeightings)
  return custodyWorkloadPoints
}
