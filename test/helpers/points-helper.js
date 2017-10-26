const Tiers = require('../../app/points/domain/tiers')
const Workload = require('../../app/points/domain/workload')
const CourtReports = require('../../app/points/domain/court-reports')
const Tier = require('../../app/points/domain/tier')
const TierCounts = require('../../app/points/domain/tier-counts')
const Locations = require('../../app/staging/constants/locations')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const LocationPointsConfiguration = require('../../app/points/domain/location-points-configuration')
const PointsConfiguration = require('../../app/points/domain/points-configuration')
const DefaultContractedHours = require('../../app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('../../app/points/domain/default-nominal-targets')

module.exports.getTestWorkloadObject = function () {
  var workload = new Workload(1, // workload owner id
                              1, // total cases
                              9, // monthly sdrs
                              8, // sdrs due next 30 days
                              7, // sdr conversions last 30 days
                              5, // oral reports
                              6, // paroms complete last 30 days
                              5, // paroms due next 30 days
                              module.exports.getTestTiersObject(Locations.CUSTODY),
                              module.exports.getTestTiersObject(Locations.COMMUNITY),
                              module.exports.getTestTiersObject(Locations.LICENSE),
                              4, // license cases last 16 weeks
                              3, // community cases last 16 weeks
                              2, // arms community cases
                              1, // arms license cases
                              10, // staging id
                              11) // workload report id
  return workload
}

module.exports.getTestCourtReportsObject = function (workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId) {
  var courtReports = new CourtReports(
    workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId
  )
  return courtReports
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
  return new CaseTypeWeightings(10, 20, 30, 4, 5, pointsConfig)
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
