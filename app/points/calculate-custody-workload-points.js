const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

module.exports = function (custodyTiers, caseTypeWeightings) {
  var custodyWorkloadPoints = calculatePointsForTier(custodyTiers.tierCounts, custodyTiers.points, caseTypeWeightings)

  return custodyWorkloadPoints
}
