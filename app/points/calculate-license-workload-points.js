const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

module.exports = function (licenseTiers, caseTypeWeightings) {
  var licenseWorkloadPoints = calculatePointsForTier(licenseTiers.tierCounts, licenseTiers.points, caseTypeWeightings)

  return licenseWorkloadPoints
}
