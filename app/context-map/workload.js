const StagingWorkload = require('../staging/domain/om-workload')
const Workload = require('../points/domain/workload')
const Locations = require('../staging/constants/locations')
const zeroIfNull = require('./helpers/zero-if-null')

const mapTiers = require('./tiers')
const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')

module.exports = function (stagingWorkload, workloadOwnerId, workloadReportId) {
  assertObjectType(stagingWorkload, StagingWorkload, 'StagingWorkload')
  assertNumber(workloadOwnerId, 'Workload Owner Id')
  assertNumber(workloadReportId, 'Workload Report Id')

  var monthlySdrs = zeroIfNull(stagingWorkload.courtReports.sdrLast30)
  var sdrsDueNext30Days = zeroIfNull(stagingWorkload.courtReports.sdrDueNext30)
  var sdrsConversionsLast30Days = zeroIfNull(stagingWorkload.courtReports.sdrConvLast30)

  var paromsCompletedLast30Days = zeroIfNull(stagingWorkload.instReports.paromCompLast30)
  var paromsDueNext30Days = zeroIfNull(stagingWorkload.instReports.paromDueNext30)

  var communityCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.COMMUNITY))
  var custodyCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.CUSTODY))
  var licenseCaseDetails = stagingWorkload.caseDetails.filter(locationFilter(Locations.LICENSE))

  var communitySummary = stagingWorkload.casesSummary.communityTiers
  var custodySummary = stagingWorkload.casesSummary.custodyTiers
  var licenseSummary = stagingWorkload.casesSummary.licenseTiers

  var communityTiers = mapTiers(communitySummary, communityCaseDetails, Locations.COMMUNITY)
  var custodyTiers = mapTiers(custodySummary, custodyCaseDetails, Locations.CUSTODY)
  var licenseTiers = mapTiers(licenseSummary, licenseCaseDetails, Locations.LICENSE)

  var t2aCommunitySummary = stagingWorkload.casesSummary.t2aCommunityTiers
  var t2aCustodySummary = stagingWorkload.casesSummary.t2aCustodyTiers
  var t2aLicenseSummary = stagingWorkload.casesSummary.t2aLicenseTiers

  var t2aCommunityTiers = mapTiers(t2aCommunitySummary, communityCaseDetails, Locations.COMMUNITY)
  var t2aCustodyTiers = mapTiers(t2aCustodySummary, custodyCaseDetails, Locations.CUSTODY)
  var t2aLicenseTiers = mapTiers(t2aLicenseSummary, licenseCaseDetails, Locations.LICENSE)

  var licenseCasesLast16Weeks = zeroIfNull(stagingWorkload.casesSummary.licIn1st16Weeks)
  var communityCasesLast16Weeks = zeroIfNull(stagingWorkload.casesSummary.comIn1st16Weeks)

  var armsCommunityCases = zeroIfNull(stagingWorkload.casesSummary.armsCommunityCases)
  var armsLicenseCases = zeroIfNull(stagingWorkload.casesSummary.armsLicenseCases)

  var totalT2aCases = t2aCommunityTiers.total + t2aCustodyTiers.total + t2aLicenseTiers.total
  var totalCases = communityTiers.total + custodyTiers.total + licenseTiers.total + totalT2aCases

  var stagingId = stagingWorkload.stagingId

  return new Workload(
    workloadOwnerId,
    totalCases,
    totalT2aCases,
    monthlySdrs,
    sdrsDueNext30Days,
    sdrsConversionsLast30Days,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    custodyTiers,
    communityTiers,
    licenseTiers,
    t2aCustodyTiers,
    t2aCommunityTiers,
    t2aLicenseTiers,
    licenseCasesLast16Weeks,
    communityCasesLast16Weeks,
    armsCommunityCases,
    armsLicenseCases,
    stagingId,
    workloadReportId
  )
}

var locationFilter = function (location) {
  return function (element) {
    return element.location === location
  }
}
