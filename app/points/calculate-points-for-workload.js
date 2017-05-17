const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')
const Tiers = require('../../app/points/domain/tiers')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (tiers, caseTypeWeightings) {
  assertObjectType(tiers, Tiers, 'Tiers')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')
  var tierList = tiers.getTiersAsList()
  var tiersWorkloadPoints = calculatePointsForTiers(tierList, caseTypeWeightings)
  return tiersWorkloadPoints
}
