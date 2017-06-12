const StagingWorkload = require('../staging/domain/om-workload')
const Workload = require('../points/domain/workload')
const Locations = require('../staging/constants/locations')

const mapTiers = require('./tiers')
const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')

module.exports = function (stagingWorkload, workloadOwnerId) {
  assertObjectType(stagingWorkload, StagingWorkload, 'StagingWorkload')
  assertNumber(workloadOwnerId, 'Workload Owner Id')

  // TODO will there ever be multiple court and inst reports per workload?
  var monthlySdrs = zeroIfUndefined(stagingWorkload.courtReports[0].sdrLast30)
  var sdrsDueNext30Days = zeroIfUndefined(stagingWorkload.courtReports[0].sdrDueNext30)

  var paromsCompletedLast30Days = zeroIfUndefined(stagingWorkload.instReports[0].paromCompLast30)
  var paromsDueNext30Days = zeroIfUndefined(stagingWorkload.instReports[0].paromDueNext30)

  var communityCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.COMMUNITY))
  var custodyCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.CUSTODY))
  var licenseCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.LICENSE))

  var communitySummary = stagingWorkload.casesSummary.communityTiers
  var custodySummary = stagingWorkload.casesSummary.custodyTiers
  var licenseSummary = stagingWorkload.casesSummary.licenseTiers

  var communityTiers = mapTiers(communitySummary, communityCaseDetails, Locations.COMMUNITY)
  var custodyTiers = mapTiers(custodySummary, custodyCaseDetails, Locations.CUSTODY)
  var licenseTiers = mapTiers(licenseSummary, licenseCaseDetails, Locations.LICENSE)

  var totalCases = communityTiers.total + custodyTiers.total + licenseTiers.total
  var totalCasesCustody = custodyTiers.total
  var totalCasesCommunity = communityTiers.total
  var totalCasesLicense = licenseTiers.total

  return new Workload(
    workloadOwnerId,
    totalCases,
    totalCasesCustody,
    totalCasesCommunity,
    totalCasesLicense,
    monthlySdrs,
    sdrsDueNext30Days,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    custodyTiers,
    communityTiers,
    licenseTiers
  )
}

var locationFilter = function (location) {
  return function (element) {
    return element.location === location
  }
}

var zeroIfUndefined = function (value = 0) {
  return parseInt(value, 10)
}
