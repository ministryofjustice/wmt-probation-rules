const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

module.exports = function (custodyTiers, caseTypeWeightings) {
  var custodyWorkloadPoints = 0
  custodyTiers.getAsList().forEach(function (tierCount) {
    custodyWorkloadPoints += calculatePointsForTier(tierCount, custodyTiers.points, caseTypeWeightings)
  }, this)

  return custodyWorkloadPoints
}
