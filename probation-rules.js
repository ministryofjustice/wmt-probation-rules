// Constants
const Locations = require('./app/staging/constants/locations')

// Configurations
const PointsConfiguration = require('./app/points/domain/points-configuration')
const LocationPointsConfiguration = require('./app/points/domain/location-points-configuration')
const DefaultContractedHours = require('./app/points/domain/default-contracted-hours')
const DefaultNominalTargets = require('./app/points/domain/default-nominal-targets')
const CaseTypeWeightings = require('./app/points/domain/case-type-weightings')

// Areas
const Region = require('./app/points/domain/region')
const Ldu = require('./app/points/domain/ldu')
const Team = require('./app/points/domain/team')

// Workload object
const OmWorkload = require('./app/staging/domain/om-workload')
const Workload = require('./app/points/domain/workload')
const CasesSummary = require('./app/staging/domain/cases-summary')
const CourtReport = require('./app/staging/domain/court-report')
const InstitutionalReport = require('./app/staging/domain/institutional-report')
const CaseDetails = require('./app/staging/domain/case-details')

// Workload dependencies
const OffenderManager = require('./app/points/domain/offender-manager')
const WorkloadOwner = require('./app/points/domain/workload-owner')
const WorkingHours = require('./app/points/domain/working-hours')
const Tiers = require('./app/staging/domain/tiers')
const AppTiers = require('./app/points/domain/tiers')
const TierCounts = require('./app/points/domain/tier-counts')

// Helpers
const stagingHelper = require('./test/helpers/staging-helper')
const pointsHelper = require('./test/helpers/points-helper')

// Calcuation Methods
const calculateAvailablePoints = require('./app/points/calculate-available-points')
const calculateNominalTarget = require('./app/points/calculate-nominal-target')
const calculateParomPoints = require('./app/points/calculate-parom-points')
const calculateSdrConversionPoints = require('./app/points/calculate-sdr-conversion-points')
const calculateWorkloadPoints = require('./app/points/calculate-points-for-workload')

// Context Map
const mapWorkload = require('./app/context-map/workload')

module.exports = {
  CasesSummary: CasesSummary,
  CaseDetails: CaseDetails,
  CourtReport: CourtReport,
  CaseTypeWeightings: CaseTypeWeightings,
  DefaultContractedHours: DefaultContractedHours,
  DefaultNominalTargets: DefaultNominalTargets,
  InstitutionalReport: InstitutionalReport,
  Ldu: Ldu,
  Locations: Locations,
  LocationPointsConfiguration: LocationPointsConfiguration,
  OffenderManager: OffenderManager,
  OmWorkload: OmWorkload,
  PointsConfiguration: PointsConfiguration,
  Region: Region,
  stagingTestHelper: stagingHelper,
  pointsHelper: pointsHelper,
  Team: Team,
  TierCounts: TierCounts,
  Tiers: Tiers,
  AppTiers: AppTiers, 
  WorkloadOwner: WorkloadOwner,
  WorkingHours: WorkingHours,
  Workload: Workload,
  calculateAvailablePoints: calculateAvailablePoints,
  calculateNominalTarget: calculateNominalTarget,
  calculateParomPoints: calculateParomPoints,
  calculateSdrConversionPoints: calculateSdrConversionPoints,
  calculateWorkloadPoints: calculateWorkloadPoints,
  mapWorkload: mapWorkload
}
