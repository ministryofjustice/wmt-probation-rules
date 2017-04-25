const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')
const CaseTypeWeightings = require('../../../app/points/domain/case-type-weightings')

module.exports = function (custodyTiers) {
  var custodyWorkloadPoints = calculatePointsForTier(custodyTiers.tierCounts, custodyTiers.points, new CaseTypeWeightings(0, 0, 0))

  // TODO: Add special calculations
  return custodyWorkloadPoints
}
