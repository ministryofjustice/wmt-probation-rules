const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')
const calculateSdrConversionPoints = require('../../app/points/calculate-sdr-conversion-points')
const calculateParomPoints = require('../../app/points/calculate-parom-points')
const calculateArmsPoints = require('../../app/points/calculate-arms-points')

const Workload = require('../../app/points/domain/workload')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (workload, caseTypeWeightings) {
  assertObjectType(workload, Workload, 'workload')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')

  var communityTierPoints = calculatePointsForTiers(workload.communityTiers, caseTypeWeightings.pointsConfiguration.communityTierPointsConfig, caseTypeWeightings)
  var custodyTierPoints = calculatePointsForTiers(workload.custodyTiers, caseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, caseTypeWeightings)
  var licenseTierPoints = calculatePointsForTiers(workload.licenseTiers, caseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, caseTypeWeightings)

  var sdrConversionPointsLast30Days = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
  var monthlySdrConversionPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
  var paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
  var armsPoints = calculateArmsPoints(workload.armsLicenseCases, workload.armsCommunityCases, caseTypeWeightings.armsLicense, caseTypeWeightings.armsCommunity)

  var totalWorkloadPoints = communityTierPoints +
                                custodyTierPoints +
                                licenseTierPoints +
                                sdrConversionPointsLast30Days +
                                monthlySdrConversionPoints +
                                paromsPoints +
                                armsPoints

  var pointsBreakdown = {
    total: totalWorkloadPoints,
    sdrPoints: monthlySdrConversionPoints,
    sdrConversionPoints: sdrConversionPointsLast30Days,
    paromsPoints: paromsPoints,
    armsPoints: armsPoints
  }
  return pointsBreakdown
}
