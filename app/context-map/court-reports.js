const StagingCourtReports = require('../staging/domain/om-court-reports')
const CourtReports = require('../points/domain/court-reports')
const zeroIfNull = require('./helpers/zero-if-null')
const assertObjectType = require('../points/domain/validation/assert-object-type')
const assertNumber = require('../points/domain/validation/assert-number')

module.exports = function (stagingCourtReports, workloadOwnerId, workloadReportId) {
  assertObjectType(stagingCourtReports, StagingCourtReports, 'StagingCourtReports')
  assertNumber(workloadOwnerId, 'Workload Owner Id')
  assertNumber(workloadReportId, 'Workload Report Id')

  var totalSdrs = zeroIfNull(stagingCourtReports.courtReports.sdrLast30)
  var totalFdrs = zeroIfNull(stagingCourtReports.courtReports.sdrConvLast30)
  var totalOralReports = zeroIfNull(stagingCourtReports.courtReports.oralReports)

  var stagingId = stagingCourtReports.stagingId

  return new CourtReports(
    workloadOwnerId,
    totalSdrs,
    totalFdrs,
    totalOralReports,
    stagingId,
    workloadReportId
  )
}
