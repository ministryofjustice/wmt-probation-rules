const StagingWorkload = require('../staging/domain/om-workload')
const Workload = require('../points/domain/workload')
const Locations = require('../staging/constants/locations')

const mapTiers = require('./tiers')
const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'

module.exports = function (stagingWorkload, workloadOwnerId) {
  assertObjectType(stagingWorkload, StagingWorkload, 'StagingWorkload')
  assertNumber(workloadOwnerId, 'Workload Owner Id')

  // TODO will there ever be multiple court and inst reports per workload?
  var monthlySdrs = zeroIfUndefined(stagingWorkload.courtReports[0].sdrLast30)
  var sdrsDueNext30Days = zeroIfUndefined(stagingWorkload.courtReports[0].sdrDueNext30)
  var unpaidWorkCount = stagingWorkload.caseDetails.filter(rowTypeFilter(CASE_TYPE_UNPAID)).length
  var activeWarrantsCount = stagingWorkload.caseDetails.filter(rowTypeFilter(CASE_TYPE_WARRANT)).length
  var overdueTerminations = stagingWorkload.caseDetails.filter(rowTypeFilter(CASE_TYPE_OVERDUE_TERMINATION)).length

  var totalInactiveCases = overdueTerminations + activeWarrantsCount + unpaidWorkCount
  var paromsCompletedLast30Days = zeroIfUndefined(stagingWorkload.instReports[0].paromCompLast30)
  var paromsDueNext30Days = zeroIfUndefined(stagingWorkload.instReports[0].paromDueNext30)
  var license16WeekCount = zeroIfUndefined(stagingWorkload.casesSummary.licIn1st16Weeks)

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

  return new Workload(
    workloadOwnerId,
    totalCases,
    totalInactiveCases,
    monthlySdrs,
    sdrsDueNext30Days,
    unpaidWorkCount,
    activeWarrantsCount,
    overdueTerminations,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    license16WeekCount,
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

var rowTypeFilter = function (rowType) {
  return function (element) {
    return element.rowType === rowType
  }
}
