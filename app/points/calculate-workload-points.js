const calculatePointsForWorkload = require('../../app/points/calculate-points-for-workload')
const Workload = require('../../app/points/domain/workload')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (workload, caseTypeWeightings) {
  assertObjectType(workload, Workload, 'workload')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  var totalWorkloadPoints = calculatePointsForWorkload(workload.communityTiers, caseTypeWeightings) +
                            calculatePointsForWorkload(workload.custodyTiers, caseTypeWeightings) +
                            calculatePointsForWorkload(workload.licenseTiers, caseTypeWeightings)
  return totalWorkloadPoints
}
