const calculatePointsForWorkload = require('../../app/points/calculate-points-for-workload')

module.exports = function (workload, caseTypeWeightings) {
  var totalWorkloadPoints = calculatePointsForWorkload(workload.communityTiers, caseTypeWeightings) +
                            calculatePointsForWorkload(workload.custodyTiers, caseTypeWeightings) +
                            calculatePointsForWorkload(workload.licenseTiers, caseTypeWeightings)
  return totalWorkloadPoints
}
