const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')

module.exports = function (licenseTiers, caseTypeWeightings) {
  var licenseWorkloadPoints = 0
  licenseTiers.getTierCountsAsList().forEach(function (tier) {
    licenseTiers += calculatePointsForTier(tier, tier.points, caseTypeWeightings)
  }, this)

  return licenseWorkloadPoints
}
