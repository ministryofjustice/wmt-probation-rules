const Tiers = require('../../app/points/domain/tiers')
const Workload = require('../../app/points/domain/workload')
const CourtReports = require('../../app/points/domain/court-reports')
const TierCounts = require('../../app/points/domain/tier-counts')
const Locations = require('../../app/staging/constants/locations')
const CaseTypeWeightings = require('../../app/points/domain/case-type-weightings')
const LocationPointsConfiguration = require('../../app/points/domain/location-points-configuration')
const PointsConfiguration = require('../../app/points/domain/points-configuration')
const DefaultContractedHours = require('../../app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('../../app/points/domain/default-nominal-targets')

module.exports.getTestWorkloadObject = function () {
  const workload = new Workload(1, // workload owner id
    1, // total cases
    1, // total t2a cases
    9, // monthly sdrs
    8, // sdrs due next 30 days
    7, // sdr conversions last 30 days
    6, // paroms complete last 30 days
    5, // paroms due next 30 days
    module.exports.getTestTiersObject(Locations.CUSTODY),
    module.exports.getTestTiersObject(Locations.COMMUNITY),
    module.exports.getTestTiersObject(Locations.LICENSE),
    module.exports.getTestTiersObject(Locations.CUSTODY), // t2a custody tiers
    module.exports.getTestTiersObject(Locations.COMMUNITY), // t2a community tiers
    module.exports.getTestTiersObject(Locations.LICENSE), // t2a licence tiers
    4, // license cases last 16 weeks
    3, // community cases last 16 weeks
    2, // arms community cases
    1, // arms license cases
    10, // staging id
    11, // workload report id
    module.exports.getTestTiersObject(Locations.COMMUNITY), // filtered community tiers
    module.exports.getTestTiersObject(Locations.CUSTODY), // filtered custody tiers
    module.exports.getTestTiersObject(Locations.LICENSE), // filtered licence tiers
    92)
  return workload
}

module.exports.getTestCourtReportsObject = function (workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId) {
  const courtReports = new CourtReports(
    workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId
  )
  return courtReports
}

module.exports.getTestTiersObject = function (location) {
  const tiers = new Tiers(location,
    module.exports.getTierCountsObject(0),
    module.exports.getTierCountsObject(16),
    module.exports.getTierCountsObject(15),
    module.exports.getTierCountsObject(14),
    module.exports.getTierCountsObject(13),
    module.exports.getTierCountsObject(12),
    module.exports.getTierCountsObject(11),
    module.exports.getTierCountsObject(10),
    module.exports.getTierCountsObject(9),
    module.exports.getTierCountsObject(8),
    module.exports.getTierCountsObject(7),
    module.exports.getTierCountsObject(6),
    module.exports.getTierCountsObject(5),
    module.exports.getTierCountsObject(4),
    module.exports.getTierCountsObject(3),
    module.exports.getTierCountsObject(2),
    module.exports.getTierCountsObject(1))
  return tiers
}

module.exports.getTierCountsObject = function (tierCode) {
  const tierCounts = new TierCounts(8, 1, 2, 3, 1, 12, tierCode) // total, warrants, unpaid, overdue, suspended, suspended lifers
  return tierCounts
}

module.exports.getTierCountsList = function (numberOfTierCounts) {
  const tierCountsList = []
  for (let i = 0; i < numberOfTierCounts; i++) {
    tierCountsList.push(module.exports.getTierCountsObject())
  }
  return tierCountsList
}

module.exports.getLocationPointsConfiguration = function () {
  const locationPointsConfiguration = new LocationPointsConfiguration(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
  return locationPointsConfiguration
}

module.exports.getCaseTypeWeightings = function () {
  const pointsConfig = new PointsConfiguration(
    exports.getLocationPointsConfiguration(),
    exports.getLocationPointsConfiguration(),
    exports.getLocationPointsConfiguration(),
    4, // sdr
    5, // sdr conversions
    new DefaultNominalTargets(1, 2),
    new DefaultContractedHours(1, 2, 3),
    true, // paroms enabled
    8 // paroms
  )
  return new CaseTypeWeightings(0, 100, 0, 4, 5, pointsConfig)
  // warrants, unpaid, overdue, armsComm, armsLicense
}

module.exports.getDefaultNominalTargets = function () {
  const defaultNominalTargets = new DefaultNominalTargets(20, 20)
  return defaultNominalTargets
}

module.exports.getDefaultContractedHours = function () {
  const defaultConntractedHours = new DefaultContractedHours(37.5, 37.5, 0)
  return defaultConntractedHours
}
