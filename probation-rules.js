const OmWorkload = require('./app/staging/domain/om-workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CaseDetails = require('./app/staging/domain/case-details')
const stagingHelper = require('./test/helpers/staging-helper')
const OffenderManager = require('./app/points/domain/offender-manager')
const Team = require('./app/points/domain/team')
const WorkloadOwner = require('./app/points/domain/workload-owner')
const WorkingHours = require('./app/points/domain/working-hours')


module.exports = {
  OmWorkload: OmWorkload,
  CasesSummary: CasesSummary,
  CaseDetails: CaseDetails,
  stagingTestHelper: stagingHelper,
  OffenderManager: OffenderManager,
  Team: Team,
  WorkloadOwner: WorkloadOwner,
  WorkingHours: WorkingHours
}
