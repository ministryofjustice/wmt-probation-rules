const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')

module.exports = function (licenseTiers, caseTypeWeightings) {
  var licenseWorkloadPoints = 0
  licenseTiers.getAsList().forEach(function (tierCount) {
    licenseTiers += calculatePointsForTier(tierCount, licenseTiers.points, caseTypeWeightings)
  }, this)

  return licenseWorkloadPoints
}
