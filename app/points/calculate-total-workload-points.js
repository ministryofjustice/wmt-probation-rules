const calculateTierWorkloadPoints = require('../../app/points/calculate-tier-workload-points')

module.exports = function (workload, caseTypeWeightings) {
  var totalWorkloadPoints = calculateTierWorkloadPoints(workload.communityTiers, caseTypeWeightings) +
                            calculateTierWorkloadPoints(workload.custodyTiers, caseTypeWeightings) +
                            calculateTierWorkloadPoints(workload.licenseTiers, caseTypeWeightings)
  return totalWorkloadPoints
}
