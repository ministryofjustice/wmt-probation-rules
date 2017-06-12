const OmWorkload = require('./app/staging/domain/om-workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CaseDetails = require('./app/staging/domain/case-details')
const stagingHelper = require('./test/helpers/staging-helper')
const OffenderManager = require('./app/points/domain/offender-manager')
const PointsConfiguration = require('./app/points/domain/points-configuration')
const LocationPointsConfiguration = require('./app/points/domain/location-points-configuration')
const DefaultContractedHours = require('./app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('./app/points/domain/default-nominal-targets')
const Team = require('./app/points/domain/team')
const WorkloadOwner = require('./app/points/domain/workload-owner')
const WorkingHours = require('./app/points/domain/working-hours')

module.exports = {
  OmWorkload: OmWorkload,
  CasesSummary: CasesSummary,
  CaseDetails: CaseDetails,
  DefaultContractedHours: DefaultContractedHours,
  DefaultNominalTargets: DefaultNominalTargets,
  LocationPointsConfiguration: LocationPointsConfiguration,
  PointsConfiguration: PointsConfiguration,
  stagingTestHelper: stagingHelper,
  OffenderManager: OffenderManager,
  Team: Team,
  WorkloadOwner: WorkloadOwner,
  WorkingHours: WorkingHours
}
