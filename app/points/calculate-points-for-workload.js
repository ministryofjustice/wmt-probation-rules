const calculatePointsForTiers = require('../../app/points/calculate-points-for-tiers')
const Tiers = require('../../app/points/domain/tiers')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

module.exports = function (tiers, caseTypeWeightings) {
  assertObjectType(tiers, Tiers, 'Tiers')
  var tierList = tiers.getTiersAsList()
  var tiersWorkloadPoints = calculatePointsForTiers(tierList, caseTypeWeightings)
  return tiersWorkloadPoints
}
