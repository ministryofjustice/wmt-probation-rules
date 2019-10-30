const expect = require('chai').expect
const mapper = require('../../../app/context-map/workload')
const stagingHelper = require('../../helpers/staging-helper')
const Locations = require('../../../app/staging/constants/locations')
const Tiers = require('../../../app/points/domain/tiers')
const CasesSummary = require('../../../app/staging/domain/cases-summary')
const OmWorkload = require('../../../app/staging/domain/om-workload')
const CourtReport = require('../../../app/staging/domain/court-report')
const InstitutionalReport = require('../../../app/staging/domain/institutional-report')
const CaseDetails = require('../../../app/staging/domain/case-details')
const StagingTiers = require('../../../app/staging/domain/tiers')

describe('context-map/workload', function () {
  var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
  var omKey = '1234'
  var stagingWorkload = stagingHelper.getTestOmWorkload(caseRefNo, omKey, Locations.COMMUNITY)
  var ownerId = 10
  var workloadReportId = 5

  it('should validate the parameters are as expected', function () {
    expect(() => mapper({}, ownerId)).to.throw(Error)
    expect(() => mapper(stagingWorkload, undefined)).to.throw(Error)
    expect(() => mapper(stagingWorkload, ownerId, workloadReportId)).not.to.throw(Error)
  })

  it('should correctly map the staging id field', function () {
    expect(mapper(stagingWorkload, ownerId, workloadReportId).stagingId).to.equal(stagingWorkload.stagingId)
  })

  it('should correctly map the staging id field', function () {
    expect(mapper(stagingWorkload, ownerId, workloadReportId).workloadReportId).to.equal(workloadReportId)
  })

  describe('case summary fields', function () {
    var communityTiers = stagingHelper.getTestTiers(Locations.COMMUNITY)
    var custodyTiers = stagingHelper.getTestTiers(Locations.CUSTODY)
    var licenseTiers = stagingHelper.getTestTiers(Locations.LICENSE)

    var t2aCommunityTiers = stagingHelper.getTestTiers(Locations.COMMUNITY)
    var t2aCustodyTiers = stagingHelper.getTestTiers(Locations.CUSTODY)
    var t2aLicenseTiers = stagingHelper.getTestTiers(Locations.LICENSE)

    stagingWorkload.casesSummary.communityTiers = communityTiers
    stagingWorkload.casesSummary.custodyTiers = custodyTiers
    stagingWorkload.casesSummary.licenseTiers = licenseTiers

    stagingWorkload.casesSummary.t2aCommunityTiers = t2aCommunityTiers
    stagingWorkload.casesSummary.t2aCustodyTiers = t2aCustodyTiers
    stagingWorkload.casesSummary.t2aLicenseTiers = t2aLicenseTiers

    var mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('should correctly map the workload owner id', function () {
      expect(mappedWorkload.workloadOwnerId).to.equal(ownerId)
    })

    it('should correctly calculate the total number of cases', function () {
      var workloadWith48Cases = stagingHelper.getTestOmWorkload(caseRefNo, omKey, undefined)

      workloadWith48Cases.casesSummary.communityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith48Cases.casesSummary.custodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith48Cases.casesSummary.licenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)
      workloadWith48Cases.casesSummary.t2aCommunityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith48Cases.casesSummary.t2aCustodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith48Cases.casesSummary.t2aLicenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)

      var mappedWorkloadWith48Cases = mapper(workloadWith48Cases, ownerId, workloadReportId)
      expect(mappedWorkloadWith48Cases.totalCases).to.equal(66)
    })

    it('should correctly map the custody tiers', function () {
      expect(mappedWorkload.custodyTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.custodyTiers.location).to.eq(Locations.CUSTODY)
      expect(mappedWorkload.custodyTiers.untiered.total).to.eq(parseInt(custodyTiers.untiered))
      expect(mappedWorkload.custodyTiers.d2.total).to.eq(parseInt(custodyTiers.d2))
      expect(mappedWorkload.custodyTiers.d1.total).to.eq(parseInt(custodyTiers.d1))
      expect(mappedWorkload.custodyTiers.c2.total).to.eq(parseInt(custodyTiers.c2))
      expect(mappedWorkload.custodyTiers.c1.total).to.eq(parseInt(custodyTiers.c1))
      expect(mappedWorkload.custodyTiers.b2.total).to.eq(parseInt(custodyTiers.b2))
      expect(mappedWorkload.custodyTiers.b1.total).to.eq(parseInt(custodyTiers.b1))
      expect(mappedWorkload.custodyTiers.a.total).to.eq(0)
    })

    it('should correctly map the community tiers', function () {
      expect(mappedWorkload.communityTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.communityTiers.location).to.eq(Locations.COMMUNITY)
      expect(mappedWorkload.communityTiers.untiered.total).to.eq(parseInt(communityTiers.untiered))
      expect(mappedWorkload.communityTiers.d2.total).to.eq(parseInt(communityTiers.d2))
      expect(mappedWorkload.communityTiers.d1.total).to.eq(parseInt(communityTiers.d1))
      expect(mappedWorkload.communityTiers.c2.total).to.eq(parseInt(communityTiers.c2))
      expect(mappedWorkload.communityTiers.c1.total).to.eq(parseInt(communityTiers.c1))
      expect(mappedWorkload.communityTiers.b2.total).to.eq(parseInt(communityTiers.b2))
      expect(mappedWorkload.communityTiers.b1.total).to.eq(parseInt(communityTiers.b1))
      expect(mappedWorkload.communityTiers.a.total).to.eq(0)
    })

    it('should correctly map the license tiers', function () {
      expect(mappedWorkload.licenseTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.licenseTiers.location).to.eq(Locations.LICENSE)
      expect(mappedWorkload.licenseTiers.untiered.total).to.eq(parseInt(licenseTiers.untiered))
      expect(mappedWorkload.licenseTiers.d2.total).to.eq(parseInt(licenseTiers.d2))
      expect(mappedWorkload.licenseTiers.d1.total).to.eq(parseInt(licenseTiers.d1))
      expect(mappedWorkload.licenseTiers.c2.total).to.eq(parseInt(licenseTiers.c2))
      expect(mappedWorkload.licenseTiers.c1.total).to.eq(parseInt(licenseTiers.c1))
      expect(mappedWorkload.licenseTiers.b2.total).to.eq(parseInt(licenseTiers.b2))
      expect(mappedWorkload.licenseTiers.b1.total).to.eq(parseInt(licenseTiers.b1))
      expect(mappedWorkload.licenseTiers.a.total).to.eq(0)
    })

    it('should correctly calculate the total number of t2a cases', function () {
      var workloadWith24T2aCases = stagingHelper.getTestOmWorkload(caseRefNo, omKey, undefined)

      workloadWith24T2aCases.casesSummary.communityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith24T2aCases.casesSummary.custodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith24T2aCases.casesSummary.licenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)
      workloadWith24T2aCases.casesSummary.t2aCommunityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith24T2aCases.casesSummary.t2aCustodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith24T2aCases.casesSummary.t2aLicenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)

      var mappedWorkloadWith24T2aCases = mapper(workloadWith24T2aCases, ownerId, workloadReportId)
      expect(mappedWorkloadWith24T2aCases.totalT2aCases).to.equal(33)
    })

    it('should correctly map the licenseCasesLast16Weeks field', function () {
      expect(mappedWorkload.licenseCasesLast16Weeks).to.eq(parseInt(stagingWorkload.casesSummary.licIn1st16Weeks))
    })

    it('should correctly map the communityCasesLast16Weeks field', function () {
      expect(mappedWorkload.communityCasesLast16Weeks).to.eq(parseInt(stagingWorkload.casesSummary.comIn1st16Weeks))
    })

    it('should correctly map the armsCommunityCases field', function () {
      expect(mappedWorkload.armsCommunityCases).to.eq(parseInt(stagingWorkload.casesSummary.armsCommunityCases))
    })

    it('should correctly map the armsLicenseCases field', function () {
      expect(mappedWorkload.armsLicenseCases).to.eq(parseInt(stagingWorkload.casesSummary.armsLicenseCases))
    })
  })

  describe('case details fields', function () {
    var communityMultiplier = 10
    var custodyMultiplier = 20
    var licenseMultiplier = 30

    var overdueTerminationsSeed = 100
    var activeWarrantsSeed = 200
    var unpaidWorkSeed = 300

    var caseDetails = []

    for (var i = 0; i < 8; i++) {
      var tierCode = i
      var tierSeed = i + 1

      if (i === 7) {
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, 0))

        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, 0))

        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, 0))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, 0))
      } else {
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, tierSeed + activeWarrantsSeed + custodyMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, tierSeed + unpaidWorkSeed + custodyMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.CUSTODY, tierSeed + overdueTerminationsSeed + custodyMultiplier))

        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, tierSeed + activeWarrantsSeed + licenseMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, tierSeed + unpaidWorkSeed + licenseMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.LICENSE, tierSeed + overdueTerminationsSeed + licenseMultiplier))

        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'W', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, tierSeed + activeWarrantsSeed + communityMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'U', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, tierSeed + unpaidWorkSeed + communityMultiplier))
        caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(omKey, 'O', undefined, tierCode.toString(), undefined, undefined, Locations.COMMUNITY, tierSeed + overdueTerminationsSeed + communityMultiplier))
      }
    }

    stagingWorkload.caseDetails = caseDetails
    var mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('should correctly map the custody overdue terminations', function () {
      expect(mappedWorkload.custodyTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a.overdueTermination).to.eq(0)
    })

    it('should correctly map the custody active warrants', function () {
      expect(mappedWorkload.custodyTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a.warrants).to.eq(0)
    })

    it('should correctly map the custody unpaid work', function () {
      expect(mappedWorkload.custodyTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a.unpaidWork).to.eq(0)
    })

    it('should correctly map the community overdue terminations', function () {
      expect(mappedWorkload.communityTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a.overdueTermination).to.eq(0)
    })

    it('should correctly map the community active warrants', function () {
      expect(mappedWorkload.communityTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a.warrants).to.eq(0)
    })

    it('should correctly map the community unpaid work', function () {
      expect(mappedWorkload.communityTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a.unpaidWork).to.eq(0)
    })

    it('should correctly map the license overdue terminations', function () {
      expect(mappedWorkload.licenseTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a.overdueTermination).to.eq(0)
    })

    it('should correctly map the license active warrants', function () {
      expect(mappedWorkload.licenseTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a.warrants).to.eq(0)
    })

    it('should correctly map the license unpaid work', function () {
      expect(mappedWorkload.licenseTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a.unpaidWork).to.eq(0)
    })
  })

  describe('court report fields', function () {
    var mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('correctly maps monthly SDRs', function () {
      expect(mappedWorkload.monthlySdrs).to.eq(parseInt(stagingWorkload.courtReports.sdrLast30))
    })

    it('correctly maps SDRs due next 30 days', function () {
      expect(mappedWorkload.sdrsDueNext30Days).to.eq(parseInt(stagingWorkload.courtReports.sdrDueNext30))
    })
  })

  describe('institutional report fields', function () {
    var mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('correctly maps paroms completed last 30 days', function () {
      expect(mappedWorkload.paromsCompletedLast30Days).to.eq(parseInt(stagingWorkload.instReports.paromCompLast30))
    })

    it('correctly maps paroms due next 30 days', function () {
      expect(mappedWorkload.paromsDueNext30Days).to.eq(parseInt(stagingWorkload.instReports.paromDueNext30))
    })
  })

  describe('Suspended lifers', function () {
    var communityTiers
    var licenceTiers
    var custodyTiers
    var filteredCommunityTiers
    var filteredLicenceTiers
    var filteredCustodyTiers
    var t2aCommunityTiers
    var t2aLicenceTiers
    var t2aCustodyTiers
    var instReports
    var courtReports
    var casesSummary
    var workload
    var caseDetails = []
    var mappedWorkloads

    before(function () {
      communityTiers = new StagingTiers(Locations.COMMUNITY, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      licenceTiers = new StagingTiers(Locations.LICENSE, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
      custodyTiers = new StagingTiers(Locations.CUSTODY, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30)
      filteredCommunityTiers = new StagingTiers(Locations.COMMUNITY, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
      filteredLicenceTiers = new StagingTiers(Locations.LICENSE, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19)
      filteredCustodyTiers = new StagingTiers(Locations.CUSTODY, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29)
      t2aCommunityTiers = new StagingTiers(Locations.COMMUNITY, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30)
      t2aLicenceTiers = new StagingTiers(Locations.LICENSE, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
      t2aCustodyTiers = new StagingTiers(Locations.CUSTODY, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20)
      casesSummary = new CasesSummary(
        'NPS', 'NPS North West', 'N01', 'Cheshire', 'N01CHS', 'Chester NPS OMU', 'N01CA3', 'Bloggs', 'Joe', 'NPSM', 'TEST100',
        communityTiers, licenceTiers, custodyTiers, t2aCommunityTiers, t2aLicenceTiers, t2aCustodyTiers, 1, 2, 3, 4,
        filteredCommunityTiers, filteredLicenceTiers, filteredCustodyTiers
      )
      courtReports = new CourtReport('TEST100', 'NPSM', 5, 6, 7)
      instReports = new InstitutionalReport('TEST100', 'NPSM', 8, 9)
      caseDetails.push(new CaseDetails('L', 'CASEREF1000', 0, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1001', 1, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 1, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1003', 2, 'N01CA3', 'NPSM', 'TEST100', Locations.CUSTODY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1004', 2, 'N01CA3', 'NPSM', 'TEST100', Locations.CUSTODY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1005', 3, 'N01CA3', 'NPSM', 'TEST100', Locations.CUSTODY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1006', 4, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1007', 4, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1008', 5, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1009', 7, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1010', 7, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1011', 7, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1012', 6, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1013', 6, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1014', 6, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1015', 6, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      caseDetails.push(new CaseDetails('L', 'CASEREF1016', 6, 'N01CA3', 'NPSM', 'TEST100', Locations.LICENSE))
      workload = new OmWorkload(2019, casesSummary, courtReports, instReports, caseDetails)
      mappedWorkloads = mapper(workload, 22, 6)
    })

    it('should create a valid mapped workload with the correct Suspended Lifer Totals', function () {
      expect(mappedWorkloads.communityTiers.untiered.suspendedLifers, 'Untiered Community Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.communityTiers.d2.suspendedLifers, 'D2 Community Suspended Lifers total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.custodyTiers.d1.suspendedLifers, 'D1 Custody Suspended Lifers total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.custodyTiers.c2.suspendedLifers, 'C2 Custody Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.licenseTiers.c1.suspendedLifers, 'C1 Licence Suspended Lifers total should equal 1').to.be.equal(2)
      expect(mappedWorkloads.licenseTiers.b2.suspendedLifers, 'B2 Licence Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.licenseTiers.b1.suspendedLifers, 'B2 Licence Suspended Lifers total should equal 5').to.be.equal(5)
      expect(mappedWorkloads.licenseTiers.a.suspendedLifers, 'A Licence Suspended Lifers total should equal 3').to.be.equal(3)
    })

    it('should create a valid mapped workload with the correct filtered community tiers', function () {
      expect(mappedWorkloads.filteredCommunityTiers.untiered.total, 'Untiered Community total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.filteredCommunityTiers.g.total, 'G Community total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.filteredCommunityTiers.f.total, 'F Community total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.filteredCommunityTiers.e.total, 'E Community total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.filteredCommunityTiers.d2.total, 'D2 Community total should equal 0').to.be.equal(3)
      expect(mappedWorkloads.filteredCommunityTiers.d1.total, 'D1 Community total should equal 1').to.be.equal(4)
      expect(mappedWorkloads.filteredCommunityTiers.c2.total, 'C2 Community total should equal 2').to.be.equal(5)
      expect(mappedWorkloads.filteredCommunityTiers.c1.total, 'C1 Community total should equal 3').to.be.equal(6)
      expect(mappedWorkloads.filteredCommunityTiers.b2.total, 'B2 Community total should equal 4').to.be.equal(7)
      expect(mappedWorkloads.filteredCommunityTiers.b1.total, 'B2 Community total should equal 5').to.be.equal(8)
      expect(mappedWorkloads.filteredCommunityTiers.a.total, 'A Community total should equal 6').to.be.equal(9)
      expect(mappedWorkloads.filteredCommunityTiers.total, 'Community overall filtered total should equal 21').to.be.equal(45)
    })

    it('should create a valid mapped workload with the correct filtered custody tiers', function () {
      expect(mappedWorkloads.filteredCustodyTiers.untiered.total, 'Untiered Custody total should equal 19').to.be.equal(19)
      expect(mappedWorkloads.filteredCustodyTiers.g.total, 'G Custody total should equal 20').to.be.equal(20)
      expect(mappedWorkloads.filteredCustodyTiers.f.total, 'F Custody total should equal 21').to.be.equal(21)
      expect(mappedWorkloads.filteredCustodyTiers.e.total, 'E Custody total should equal 22').to.be.equal(22)
      expect(mappedWorkloads.filteredCustodyTiers.d2.total, 'D2 Custody total should equal 23').to.be.equal(23)
      expect(mappedWorkloads.filteredCustodyTiers.d1.total, 'D1 Custody total should equal 24').to.be.equal(24)
      expect(mappedWorkloads.filteredCustodyTiers.c2.total, 'C2 Custody total should equal 25').to.be.equal(25)
      expect(mappedWorkloads.filteredCustodyTiers.c1.total, 'C1 Custody total should equal 26').to.be.equal(26)
      expect(mappedWorkloads.filteredCustodyTiers.b2.total, 'B2 Custody total should equal 27').to.be.equal(27)
      expect(mappedWorkloads.filteredCustodyTiers.b1.total, 'B2 Custody total should equal 28').to.be.equal(28)
      expect(mappedWorkloads.filteredCustodyTiers.a.total, 'A Custody total should equal 29').to.be.equal(29)
      expect(mappedWorkloads.filteredCustodyTiers.total, 'Custody overall filtered total should equal 264').to.be.equal(264)
    })

    it('should create a valid mapped workload with the correct filtered licence tiers', function () {
      expect(mappedWorkloads.filteredLicenseTiers.untiered.total, 'Untiered Licence total should equal 9').to.be.equal(9)
      expect(mappedWorkloads.filteredLicenseTiers.g.total, 'G Licence total should equal 10').to.be.equal(10)
      expect(mappedWorkloads.filteredLicenseTiers.f.total, 'F Licence total should equal 11').to.be.equal(11)
      expect(mappedWorkloads.filteredLicenseTiers.e.total, 'E Licence total should equal 12').to.be.equal(12)
      expect(mappedWorkloads.filteredLicenseTiers.d2.total, 'D2 Licence total should equal 13').to.be.equal(13)
      expect(mappedWorkloads.filteredLicenseTiers.d1.total, 'D1 Licence total should equal 14').to.be.equal(14)
      expect(mappedWorkloads.filteredLicenseTiers.c2.total, 'C2 Licence total should equal 15').to.be.equal(15)
      expect(mappedWorkloads.filteredLicenseTiers.c1.total, 'C1 Licence total should equal 16').to.be.equal(16)
      expect(mappedWorkloads.filteredLicenseTiers.b2.total, 'B2 Licence total should equal 17').to.be.equal(17)
      expect(mappedWorkloads.filteredLicenseTiers.b1.total, 'B2 Licence total should equal 18').to.be.equal(18)
      expect(mappedWorkloads.filteredLicenseTiers.a.total, 'A Licence total should equal 19').to.be.equal(19)
      expect(mappedWorkloads.filteredLicenseTiers.total, 'Licence overall filtered total should equal 154').to.be.equal(154)

    })
  })
})
