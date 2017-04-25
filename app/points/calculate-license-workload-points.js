const calculatePointsForTier = require('../../../app/points/calculate-points-for-tier')
const CaseTypeWeightings = require('../../../app/points/domain/case-type-weightings')

module.exports = function (licenseTiers) {
  var licenseWorkloadPoints = calculatePointsForTier(licenseTiers.tierCounts, licenseTiers.points, new CaseTypeWeightings(0, 0, 0))

  // TODO: Add special calculations
  return licenseWorkloadPoints
}
