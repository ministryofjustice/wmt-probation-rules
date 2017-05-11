const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')

module.exports = function (tiers, caseTypeWeightings) {
  var tierList = tiers.getTiersAsList()
  var tiersWorkloadPoints = calculatePointsForTiers(tierList, caseTypeWeightings)
  return tiersWorkloadPoints
}
