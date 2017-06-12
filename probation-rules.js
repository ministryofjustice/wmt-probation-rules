const OmWorkload = require('./app/staging/domain/om-workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CaseDetails = require('./app/staging/domain/case-details')
const CaseTypeWeightings = require('./app/staging/domain/case-type-weightings')
const Locations = require('./app/staging/constants/locations')

const Tiers = require('./app/points/domain/tiers')
const TierCounts = require('./app/points/domain/tier-counts')
const Workload = require('./app/points/domain/workload')

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
  CaseTypeWeightings: CaseTypeWeightings,
  DefaultContractedHours: DefaultContractedHours,
  DefaultNominalTargets: DefaultNominalTargets,
  LocationPointsConfiguration: LocationPointsConfiguration,
  PointsConfiguration: PointsConfiguration,
  stagingTestHelper: stagingHelper,
  OffenderManager: OffenderManager,
  Team: Team,
  WorkloadOwner: WorkloadOwner,
  WorkingHours: WorkingHours
  TierCounts: TierCounts,
  Tiers: Tiers,
  Workload: Workload,
  Locations: Locations,
  stagingTestHelper: stagingHelper
}
