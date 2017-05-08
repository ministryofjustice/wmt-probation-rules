const calculateTierPoints = require('../../app/points/calculate-tier-points')

module.exports = function (licenseTiers, caseTypeWeightings) {
  var licenseWorkloadPoints = calculateTierPoints(licenseTiers.getTiersAsList(), caseTypeWeightings)
  return licenseWorkloadPoints
}
