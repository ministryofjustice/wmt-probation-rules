const Tiers = require('../../app/points/domain/tiers')
const Workload = require('../../app/points/domain/workload')
const Tier = require('../../app/points/domain/tier')
const TierCounts = require('../../app/points/domain/tier-counts')
const Locations = require('../../app/staging/constants/locations')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const LocationPointsConfiguration = require('../../app/points/domain/location-points-configuration')
const PointsConfiguration = require('../../app/points/domain/points-configuration')
const DefaultContractedHours = require('../../app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('../../app/points/domain/default-nominal-targets')

module.exports.getTestWorkloadObject = function () {
  var workload = new Workload(1, 1, 1, 1, 1, 1, 1,
                              module.exports.getTestTiersObject(Locations.CUSTODY),
                              module.exports.getTestTiersObject(Locations.COMMUNITY),
                              module.exports.getTestTiersObject(Locations.LICENSE), 1, 1)
  return workload
}

module.exports.getTestTiersObject = function (location) {
  var tiers = new Tiers(location,
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject(),
                        module.exports.getTierCountsObject())
  return tiers
}

module.exports.getTierCountsObject = function () {
  var tierCounts = new TierCounts(8, 1, 2, 3) // total, warrants, unpaid, overdue
  return tierCounts
}

module.exports.getTierCountsList = function (numberOfTierCounts) {
  var tierCountsList = []
  for (var i = 0; i < numberOfTierCounts; i++) {
    tierCountsList.push(module.exports.getTierCountsObject())
  }
  return tierCountsList
}

module.exports.getLocationPointsConfiguration = function () {
  var locationPointsConfiguration = new LocationPointsConfiguration(1, 2, 3, 4, 5, 6, 7)
  return locationPointsConfiguration
}

module.exports.getCaseTypeWeightings = function () {
  var pointsConfig = new PointsConfiguration(
            exports.getLocationPointsConfiguration(),
            exports.getLocationPointsConfiguration(),
            exports.getLocationPointsConfiguration(),
            4, // sdr
            5, // sdr conversions
            new DefaultNominalTargets(1, 2),
            new DefaultContractedHours(1, 2),
            true, // paroms enabled
            8 // paroms
  )
  return new CaseTypeWeightings(1, 2, 3, 4, 5, pointsConfig)
  // warrants, unpaid, overdue, armsComm, armsLicense
}

module.exports.getDefaultNominalTargets = function () {
  var defaultNominalTargets = new DefaultNominalTargets(20, 20)
  return defaultNominalTargets
}

module.exports.getDefaultContractedHours = function () {
  var defaultConntractedHours = new DefaultContractedHours(37.5, 37.5)
  return defaultConntractedHours
}
