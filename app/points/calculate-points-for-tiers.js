const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (tiersList, caseTypeWeightings) {
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  var tierTotalCount = 0
  var tierNumber = 0
  tiersList.forEach(function (tier) {
    tierTotalCount += calculatePointsForTier(tier.tierCounts, caseTypeWeightings.pointsConfiguration[tierNumber], caseTypeWeightings)
    tierNumber++
  })
  return tierTotalCount
}
