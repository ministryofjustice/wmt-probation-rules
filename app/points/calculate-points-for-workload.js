const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')
const calculateArmsPoints = require('../../app/points/calculate-arms-points')
const Workload = require('../../app/points/domain/workload')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (workload, caseTypeWeightings) {
  assertObjectType(workload, Workload, 'workload')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  var totalWorkloadPoints = calculatePointsForTiers(workload.communityTiers, caseTypeWeightings.pointsConfiguration.communityTierPointsConfig, caseTypeWeightings) +
                            calculatePointsForTiers(workload.custodyTiers, caseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, caseTypeWeightings) +
                            calculatePointsForTiers(workload.licenseTiers, caseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, caseTypeWeightings) +
                            calculateArmsPoints(workload.armsLicenseCases, workload.armsCommunityCases, caseTypeWeightings.armsLicense, caseTypeWeightings.armsCommunity)
  return totalWorkloadPoints
}
