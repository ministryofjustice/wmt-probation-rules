const StagingWorkload = require('../staging/domain/om-workload')
const Workload = require('../points/domain/workload')
const Tiers = require('../points/domain/tiers')
const Locations = require('../staging/constants/locations')

const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')
const mapToTier = require('./tier')

const CASE_TYPE_UNPAID = 'U'
const CASE_TYPE_OVERDUE_TERMINATION = 'O'
const CASE_TYPE_WARRANT = 'W'

module.exports = function (stagingWorkload, workloadOwnerId) {
  assertObjectType(stagingWorkload, StagingWorkload, 'StagingWorkload')
  assertNumber(workloadOwnerId, 'Workload Owner Id')

  var totalCases = stagingWorkload.caseDetails.length
  // TODO will there ever be multiple court and inst reports per workload?
  var monthlySdrs = zeroIfUndefined(stagingWorkload.courtReports[0].sdrLast30)
  var sdrsDueNext30Days = zeroIfUndefined(stagingWorkload.courtReports[0].sdrsDueNext30)
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

  var communityTiers = getIndividualTiers(communityCaseDetails, Locations.COMMUNITY)
  var custodyTiers = getIndividualTiers(custodyCaseDetails, Locations.CUSTODY)
  var licenseTiers = getIndividualTiers(licenseCaseDetails, Locations.LICENSE)

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
    communityTiers,
    custodyTiers,
    licenseTiers
  )
}

var locationFilter = function (location) {
  return function (element) {
    return element.location === location
  }
}

var tierCodeFilter = function (tierCode) {
  return function (element) {
    return element.tierCode === tierCode
  }
}

var rowTypeFilter = function (rowType) {
  return function (element) {
    return element.rowType === rowType
  }
}

var getIndividualTiers = function (caseDetails, location) {
  var args = []
  args.push(location)
  for (var i = 0; i < 8; i++) {
    args.push(getTierCounts(caseDetails.filter(tierCodeFilter(i))))
  }
  return new Tiers(...args)
}

var getTierCounts = function (tierDetails) {
  if (tierDetails === undefined || tierDetails.length === 0) {
    return mapToTier(0, 0, 0, 0, 0)
  }

  var unpaidWorkCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_UNPAID)).length
  var warrantCount = tierDetails.filter(rowTypeFilter(CASE_TYPE_WARRANT)).length
  var overDueTermination = tierDetails.filter(rowTypeFilter(CASE_TYPE_OVERDUE_TERMINATION)).length

  return mapToTier(tierDetails.length, unpaidWorkCount, warrantCount, overDueTermination)
}

var zeroIfUndefined = function (value) {
  if (value === undefined) {
    return 0
  } else {
    return parseInt(value, 10)
  }
}
