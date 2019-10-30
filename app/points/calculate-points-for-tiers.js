const calculatePointsForTier = require('../../app/points/calculate-points-for-tier')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const Tiers = require('../../app/points/domain/tiers')
const LocationPointsConfiguration = require('../../app/points/domain/location-points-configuration')
const assertObjectType = require('../../app/points/domain/validation/assert-object-type')

// WMT0160: Update this module to handle Community Tiers
module.exports = function (locationTiers, locationPointsConfiguration, caseTypeWeightings, subtractInactiveCases = false) {
  assertObjectType(locationTiers, Tiers, 'Tiers')
  assertObjectType(locationPointsConfiguration, LocationPointsConfiguration, 'LocationPointsConfiguration')
  assertObjectType(caseTypeWeightings, CaseTypeWeightings, 'CaseTypeWeightings')

  var points = 0
  var tiersPointConfigurationAsList = locationPointsConfiguration.asTierList()

  var tiers = locationTiers.getTiersAsList()

  // purposely leave out the untiered cases
  for (var i = 0; i < tiers.length - 1; i++) {
    points += calculatePointsForTier(tiers[i], tiersPointConfigurationAsList[i], caseTypeWeightings, subtractInactiveCases)
  }
  return points
}
