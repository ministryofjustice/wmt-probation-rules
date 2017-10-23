const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')
const calculateSdrConversionPoints = require('../../app/points/calculate-sdr-conversion-points')
const calculateParomPoints = require('../../app/points/calculate-parom-points')
const calculateArmsPoints = require('../../app/points/calculate-arms-points')

const Workload = require('../../app/points/domain/workload')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (workload, caseTypeWeightings, t2aCaseTypeWeightings) {
  assertObjectType(workload, Workload, 'workload')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  assertObjectType(t2aCaseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')

  var communityTierPoints = calculatePointsForTiers(workload.communityTiers, caseTypeWeightings.pointsConfiguration.communityTierPointsConfig, caseTypeWeightings)
  var custodyTierPoints = calculatePointsForTiers(workload.custodyTiers, caseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, caseTypeWeightings)
  var licenseTierPoints = calculatePointsForTiers(workload.licenseTiers, caseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, caseTypeWeightings)

  var t2aCommunityTierPoints = calculatePointsForTiers(workload.t2aCommunityTiers, t2aCaseTypeWeightings.pointsConfiguration.communityTierPointsConfig, t2aCaseTypeWeightings)
  var t2aCustodyTierPoints = calculatePointsForTiers(workload.t2aCustodyTiers, t2aCaseTypeWeightings.pointsConfiguration.custodyTierPointsConfig, t2aCaseTypeWeightings)
  var t2aLicenseTierPoints = calculatePointsForTiers(workload.t2aLicenseTiers, t2aCaseTypeWeightings.pointsConfiguration.licenseTierPointsConfig, t2aCaseTypeWeightings)

  var sdrConversionPointsLast30Days = calculateSdrConversionPoints(workload.sdrConversionsLast30Days, caseTypeWeightings.pointsConfiguration.sdrConversion)
  var monthlySdrConversionPoints = calculateSdrConversionPoints(workload.monthlySdrs, caseTypeWeightings.pointsConfiguration.sdr)
  var paromsPoints = calculateParomPoints(workload.paromsCompletedLast30Days, caseTypeWeightings.pointsConfiguration.parom, caseTypeWeightings.pointsConfiguration.paromsEnabled)
  var armsPoints = calculateArmsPoints(workload.armsLicenseCases, workload.armsCommunityCases, caseTypeWeightings.armsLicense, caseTypeWeightings.armsCommunity)

  var totalWorkloadPoints = communityTierPoints +
                                custodyTierPoints +
                                licenseTierPoints +
                                t2aCommunityTierPoints +
                                t2aCustodyTierPoints +
                                t2aLicenseTierPoints +
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
