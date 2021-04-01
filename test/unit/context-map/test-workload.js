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
  const caseRefNo = stagingHelper.getGeneratedCaseRefNo()
  const omKey = '1234'
  const stagingWorkload = stagingHelper.getTestOmWorkload(caseRefNo, omKey, Locations.COMMUNITY)
  const ownerId = 10
  const workloadReportId = 5

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
    const communityTiers = stagingHelper.getTestTiers(Locations.COMMUNITY)
    const custodyTiers = stagingHelper.getTestTiers(Locations.CUSTODY)
    const licenseTiers = stagingHelper.getTestTiers(Locations.LICENSE)

    const t2aCommunityTiers = stagingHelper.getTestTiers(Locations.COMMUNITY)
    const t2aCustodyTiers = stagingHelper.getTestTiers(Locations.CUSTODY)
    const t2aLicenseTiers = stagingHelper.getTestTiers(Locations.LICENSE)

    stagingWorkload.casesSummary.communityTiers = communityTiers
    stagingWorkload.casesSummary.custodyTiers = custodyTiers
    stagingWorkload.casesSummary.licenseTiers = licenseTiers

    stagingWorkload.casesSummary.t2aCommunityTiers = t2aCommunityTiers
    stagingWorkload.casesSummary.t2aCustodyTiers = t2aCustodyTiers
    stagingWorkload.casesSummary.t2aLicenseTiers = t2aLicenseTiers

    const mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('should correctly map the workload owner id', function () {
      expect(mappedWorkload.workloadOwnerId).to.equal(ownerId)
    })

    it('should correctly calculate the total number of cases', function () {
      const workloadWith102Cases = stagingHelper.getTestOmWorkload(caseRefNo, omKey, undefined)

      workloadWith102Cases.casesSummary.communityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith102Cases.casesSummary.custodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith102Cases.casesSummary.filteredLicenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)
      workloadWith102Cases.casesSummary.filteredCommunityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith102Cases.casesSummary.filteredCustodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith102Cases.casesSummary.licenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)
      workloadWith102Cases.casesSummary.t2aCommunityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith102Cases.casesSummary.t2aCustodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith102Cases.casesSummary.t2aLicenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)

      const mappedWorkloadWith102Cases = mapper(workloadWith102Cases, ownerId, workloadReportId)
      expect(mappedWorkloadWith102Cases.totalCases).to.equal(102)
      expect(mappedWorkloadWith102Cases.totalFilteredCases).to.equal(51)
    })

    it('should correctly map the custody tiers', function () {
      expect(mappedWorkload.custodyTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.custodyTiers.location).to.eq(Locations.CUSTODY)
      expect(mappedWorkload.custodyTiers.untiered.total).to.eq(parseInt(custodyTiers.untiered))
      expect(mappedWorkload.custodyTiers.d0.total).to.eq(parseInt(custodyTiers.d0))
      expect(mappedWorkload.custodyTiers.d1.total).to.eq(parseInt(custodyTiers.d1))
      expect(mappedWorkload.custodyTiers.d2.total).to.eq(parseInt(custodyTiers.d2))
      expect(mappedWorkload.custodyTiers.d3.total).to.eq(parseInt(custodyTiers.d3))
      expect(mappedWorkload.custodyTiers.c0.total).to.eq(parseInt(custodyTiers.c0))
      expect(mappedWorkload.custodyTiers.c1.total).to.eq(parseInt(custodyTiers.c1))
      expect(mappedWorkload.custodyTiers.c2.total).to.eq(parseInt(custodyTiers.c2))
      expect(mappedWorkload.custodyTiers.c3.total).to.eq(parseInt(custodyTiers.c3))
      expect(mappedWorkload.custodyTiers.b0.total).to.eq(parseInt(custodyTiers.b0))
      expect(mappedWorkload.custodyTiers.b1.total).to.eq(parseInt(custodyTiers.b1))
      expect(mappedWorkload.custodyTiers.b2.total).to.eq(parseInt(custodyTiers.b2))
      expect(mappedWorkload.custodyTiers.b3.total).to.eq(parseInt(custodyTiers.b3))
      expect(mappedWorkload.custodyTiers.a0.total).to.eq(parseInt(custodyTiers.a0))
      expect(mappedWorkload.custodyTiers.a1.total).to.eq(parseInt(custodyTiers.a1))
      expect(mappedWorkload.custodyTiers.a2.total).to.eq(parseInt(custodyTiers.a2))
      expect(mappedWorkload.custodyTiers.a3.total).to.eq(0)
    })

    it('should correctly map the community tiers', function () {
      expect(mappedWorkload.communityTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.communityTiers.location).to.eq(Locations.COMMUNITY)
      expect(mappedWorkload.communityTiers.untiered.total).to.eq(parseInt(communityTiers.untiered))
      expect(mappedWorkload.communityTiers.d0.total).to.eq(parseInt(communityTiers.d0))
      expect(mappedWorkload.communityTiers.d1.total).to.eq(parseInt(communityTiers.d1))
      expect(mappedWorkload.communityTiers.d2.total).to.eq(parseInt(communityTiers.d2))
      expect(mappedWorkload.communityTiers.d3.total).to.eq(parseInt(communityTiers.d3))
      expect(mappedWorkload.communityTiers.c0.total).to.eq(parseInt(communityTiers.c0))
      expect(mappedWorkload.communityTiers.c1.total).to.eq(parseInt(communityTiers.c1))
      expect(mappedWorkload.communityTiers.c2.total).to.eq(parseInt(communityTiers.c2))
      expect(mappedWorkload.communityTiers.c3.total).to.eq(parseInt(communityTiers.c3))
      expect(mappedWorkload.communityTiers.b0.total).to.eq(parseInt(communityTiers.b0))
      expect(mappedWorkload.communityTiers.b1.total).to.eq(parseInt(communityTiers.b1))
      expect(mappedWorkload.communityTiers.b2.total).to.eq(parseInt(communityTiers.b2))
      expect(mappedWorkload.communityTiers.b3.total).to.eq(parseInt(communityTiers.b3))
      expect(mappedWorkload.communityTiers.a0.total).to.eq(parseInt(communityTiers.a0))
      expect(mappedWorkload.communityTiers.a1.total).to.eq(parseInt(communityTiers.a1))
      expect(mappedWorkload.communityTiers.a2.total).to.eq(parseInt(communityTiers.a2))
      expect(mappedWorkload.communityTiers.a3.total).to.eq(0)
    })

    it('should correctly map the license tiers', function () {
      expect(mappedWorkload.licenseTiers).to.be.instanceof(Tiers)
      expect(mappedWorkload.licenseTiers.location).to.eq(Locations.LICENSE)
      expect(mappedWorkload.licenseTiers.untiered.total).to.eq(parseInt(licenseTiers.untiered))
      expect(mappedWorkload.licenseTiers.d0.total).to.eq(parseInt(licenseTiers.d0))
      expect(mappedWorkload.licenseTiers.d1.total).to.eq(parseInt(licenseTiers.d1))
      expect(mappedWorkload.licenseTiers.d2.total).to.eq(parseInt(licenseTiers.d2))
      expect(mappedWorkload.licenseTiers.d3.total).to.eq(parseInt(licenseTiers.d3))
      expect(mappedWorkload.licenseTiers.c0.total).to.eq(parseInt(licenseTiers.c0))
      expect(mappedWorkload.licenseTiers.c1.total).to.eq(parseInt(licenseTiers.c1))
      expect(mappedWorkload.licenseTiers.c2.total).to.eq(parseInt(licenseTiers.c2))
      expect(mappedWorkload.licenseTiers.c3.total).to.eq(parseInt(licenseTiers.c3))
      expect(mappedWorkload.licenseTiers.b0.total).to.eq(parseInt(licenseTiers.b0))
      expect(mappedWorkload.licenseTiers.b1.total).to.eq(parseInt(licenseTiers.b1))
      expect(mappedWorkload.licenseTiers.b2.total).to.eq(parseInt(licenseTiers.b2))
      expect(mappedWorkload.licenseTiers.b3.total).to.eq(parseInt(licenseTiers.b3))
      expect(mappedWorkload.licenseTiers.a0.total).to.eq(parseInt(licenseTiers.a0))
      expect(mappedWorkload.licenseTiers.a1.total).to.eq(parseInt(licenseTiers.a1))
      expect(mappedWorkload.licenseTiers.a2.total).to.eq(parseInt(licenseTiers.a2))
      expect(mappedWorkload.licenseTiers.a3.total).to.eq(0)
    })

    it('should correctly calculate the total number of t2a cases', function () {
      const workloadWith51T2aCases = stagingHelper.getTestOmWorkload(caseRefNo, omKey, undefined)

      workloadWith51T2aCases.casesSummary.communityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith51T2aCases.casesSummary.custodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith51T2aCases.casesSummary.licenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)
      workloadWith51T2aCases.casesSummary.t2aCommunityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith51T2aCases.casesSummary.t2aCustodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith51T2aCases.casesSummary.t2aLicenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)

      const mappedWorkloadWith51T2aCases = mapper(workloadWith51T2aCases, ownerId, workloadReportId)
      expect(mappedWorkloadWith51T2aCases.totalT2aCases).to.equal(51)
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
    const communityMultiplier = 10
    const custodyMultiplier = 20
    const licenseMultiplier = 30

    const overdueTerminationsSeed = 100
    const activeWarrantsSeed = 200
    const unpaidWorkSeed = 300

    const caseDetails = []

    for (let i = 0; i < 17; i++) {
      const tierCode = i
      const tierSeed = i + 1

      if (i === 1) {
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
    const mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('should correctly map the custody overdue terminations', function () {
      expect(mappedWorkload.custodyTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d0.overdueTermination).to.eq(17 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.overdueTermination).to.eq(16 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.overdueTermination).to.eq(15 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d3.overdueTermination).to.eq(14 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c0.overdueTermination).to.eq(13 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.overdueTermination).to.eq(12 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.overdueTermination).to.eq(11 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c3.overdueTermination).to.eq(10 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b0.overdueTermination).to.eq(9 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.overdueTermination).to.eq(8 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.overdueTermination).to.eq(7 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b3.overdueTermination).to.eq(6 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a0.overdueTermination).to.eq(5 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a1.overdueTermination).to.eq(4 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a2.overdueTermination).to.eq(3 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a3.overdueTermination).to.eq(0)
    })

    it('should correctly map the custody active warrants', function () {
      expect(mappedWorkload.custodyTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d0.warrants).to.eq(17 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.warrants).to.eq(16 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.warrants).to.eq(15 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d3.warrants).to.eq(14 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c0.warrants).to.eq(13 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.warrants).to.eq(12 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.warrants).to.eq(11 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c3.warrants).to.eq(10 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b0.warrants).to.eq(9 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.warrants).to.eq(8 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.warrants).to.eq(7 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b3.warrants).to.eq(6 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a0.warrants).to.eq(5 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a1.warrants).to.eq(4 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a2.warrants).to.eq(3 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a3.warrants).to.eq(0)
    })

    it('should correctly map the custody unpaid work', function () {
      expect(mappedWorkload.custodyTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d0.unpaidWork).to.eq(17 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.unpaidWork).to.eq(16 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.unpaidWork).to.eq(15 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d3.unpaidWork).to.eq(14 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c0.unpaidWork).to.eq(13 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.unpaidWork).to.eq(12 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.unpaidWork).to.eq(11 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c3.unpaidWork).to.eq(10 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b0.unpaidWork).to.eq(9 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.unpaidWork).to.eq(8 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.unpaidWork).to.eq(7 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b3.unpaidWork).to.eq(6 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a0.unpaidWork).to.eq(5 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a1.unpaidWork).to.eq(4 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a2.unpaidWork).to.eq(3 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.a3.unpaidWork).to.eq(0)
    })

    it('should correctly map the community overdue terminations', function () {
      expect(mappedWorkload.communityTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d0.overdueTermination).to.eq(17 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.overdueTermination).to.eq(16 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.overdueTermination).to.eq(15 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d3.overdueTermination).to.eq(14 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c0.overdueTermination).to.eq(13 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.overdueTermination).to.eq(12 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.overdueTermination).to.eq(11 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c3.overdueTermination).to.eq(10 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b0.overdueTermination).to.eq(9 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.overdueTermination).to.eq(8 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.overdueTermination).to.eq(7 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b3.overdueTermination).to.eq(6 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a0.overdueTermination).to.eq(5 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a1.overdueTermination).to.eq(4 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a2.overdueTermination).to.eq(3 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a3.overdueTermination).to.eq(0)
    })

    it('should correctly map the community active warrants', function () {
      expect(mappedWorkload.communityTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d0.warrants).to.eq(17 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.warrants).to.eq(16 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.warrants).to.eq(15 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d3.warrants).to.eq(14 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c0.warrants).to.eq(13 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.warrants).to.eq(12 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.warrants).to.eq(11 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c3.warrants).to.eq(10 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b0.warrants).to.eq(9 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.warrants).to.eq(8 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.warrants).to.eq(7 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b3.warrants).to.eq(6 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a0.warrants).to.eq(5 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a1.warrants).to.eq(4 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a2.warrants).to.eq(3 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a3.warrants).to.eq(0)
    })

    it('should correctly map the community unpaid work', function () {
      expect(mappedWorkload.communityTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d0.unpaidWork).to.eq(17 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.unpaidWork).to.eq(16 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.unpaidWork).to.eq(15 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d3.unpaidWork).to.eq(14 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c0.unpaidWork).to.eq(13 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.unpaidWork).to.eq(12 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.unpaidWork).to.eq(11 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c3.unpaidWork).to.eq(10 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b0.unpaidWork).to.eq(9 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.unpaidWork).to.eq(8 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.unpaidWork).to.eq(7 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b3.unpaidWork).to.eq(6 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a0.unpaidWork).to.eq(5 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a1.unpaidWork).to.eq(4 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a2.unpaidWork).to.eq(3 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.a3.unpaidWork).to.eq(0)
    })

    it('should correctly map the license overdue terminations', function () {
      expect(mappedWorkload.licenseTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d0.overdueTermination).to.eq(17 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.overdueTermination).to.eq(16 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.overdueTermination).to.eq(15 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d3.overdueTermination).to.eq(14 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c0.overdueTermination).to.eq(13 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.overdueTermination).to.eq(12 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.overdueTermination).to.eq(11 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c3.overdueTermination).to.eq(10 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b0.overdueTermination).to.eq(9 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.overdueTermination).to.eq(8 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.overdueTermination).to.eq(7 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b3.overdueTermination).to.eq(6 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a0.overdueTermination).to.eq(5 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a1.overdueTermination).to.eq(4 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a2.overdueTermination).to.eq(3 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a3.overdueTermination).to.eq(0)
    })

    it('should correctly map the license active warrants', function () {
      expect(mappedWorkload.licenseTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d0.warrants).to.eq(17 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.warrants).to.eq(16 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.warrants).to.eq(15 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d3.warrants).to.eq(14 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c0.warrants).to.eq(13 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.warrants).to.eq(12 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.warrants).to.eq(11 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c3.warrants).to.eq(10 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b0.warrants).to.eq(9 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.warrants).to.eq(8 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.warrants).to.eq(7 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b3.warrants).to.eq(6 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a0.warrants).to.eq(5 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a1.warrants).to.eq(4 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a2.warrants).to.eq(3 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a3.warrants).to.eq(0)
    })

    it('should correctly map the license unpaid work', function () {
      expect(mappedWorkload.licenseTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d0.unpaidWork).to.eq(17 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.unpaidWork).to.eq(16 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.unpaidWork).to.eq(15 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d3.unpaidWork).to.eq(14 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c0.unpaidWork).to.eq(13 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.unpaidWork).to.eq(12 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.unpaidWork).to.eq(11 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c3.unpaidWork).to.eq(10 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b0.unpaidWork).to.eq(9 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.unpaidWork).to.eq(8 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.unpaidWork).to.eq(7 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b3.unpaidWork).to.eq(6 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a0.unpaidWork).to.eq(5 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a1.unpaidWork).to.eq(4 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a2.unpaidWork).to.eq(3 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.a3.unpaidWork).to.eq(0)
    })
  })

  describe('court report fields', function () {
    const mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('correctly maps monthly SDRs', function () {
      expect(mappedWorkload.monthlySdrs).to.eq(parseInt(stagingWorkload.courtReports.sdrLast30))
    })

    it('correctly maps SDRs due next 30 days', function () {
      expect(mappedWorkload.sdrsDueNext30Days).to.eq(parseInt(stagingWorkload.courtReports.sdrDueNext30))
    })
  })

  describe('institutional report fields', function () {
    const mappedWorkload = mapper(stagingWorkload, ownerId, workloadReportId)

    it('correctly maps paroms completed last 30 days', function () {
      expect(mappedWorkload.paromsCompletedLast30Days).to.eq(parseInt(stagingWorkload.instReports.paromCompLast30))
    })

    it('correctly maps paroms due next 30 days', function () {
      expect(mappedWorkload.paromsDueNext30Days).to.eq(parseInt(stagingWorkload.instReports.paromDueNext30))
    })
  })

  describe('Suspended lifers', function () {
    let communityTiers
    let licenceTiers
    let custodyTiers
    let filteredCommunityTiers
    let filteredLicenceTiers
    let filteredCustodyTiers
    let t2aCommunityTiers
    let t2aLicenceTiers
    let t2aCustodyTiers
    let instReports
    let courtReports
    let casesSummary
    let workload
    const caseDetails = []
    let mappedWorkloads

    before(function () {
      communityTiers = new StagingTiers(Locations.COMMUNITY, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)
      licenceTiers = new StagingTiers(Locations.LICENSE, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36)
      custodyTiers = new StagingTiers(Locations.CUSTODY, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56)
      filteredCommunityTiers = new StagingTiers(Locations.COMMUNITY, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)
      filteredLicenceTiers = new StagingTiers(Locations.LICENSE, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35)
      filteredCustodyTiers = new StagingTiers(Locations.CUSTODY, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55)
      t2aCommunityTiers = new StagingTiers(Locations.COMMUNITY, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76)
      t2aLicenceTiers = new StagingTiers(Locations.LICENSE, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96)
      t2aCustodyTiers = new StagingTiers(Locations.CUSTODY, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116)
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
      caseDetails.push(new CaseDetails('L', 'CASEREF1001', 16, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 16, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 16, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1001', 15, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 15, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 13, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1001', 10, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 10, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 10, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1001', 9, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 9, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1002', 12, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1003', 2, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
      caseDetails.push(new CaseDetails('L', 'CASEREF1004', 2, 'N01CA3', 'NPSM', 'TEST100', Locations.COMMUNITY))
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

    // 16=D0, 15=D1, 14=D2, 13=D3
    // 12=C0, 11=C1, 10=C2, 9=C3
    // 8=B0, 7=B1, 6=B2, 5=B3
    // 4=A0, 3=A1, 2=A2, 1=A3

    it('should create a valid mapped workload with the correct Suspended Lifer Totals', function () {
      expect(mappedWorkloads.communityTiers.untiered.suspendedLifers, 'Untiered Community Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.communityTiers.d0.suspendedLifers, 'D0 Community Suspended Lifers total should equal 2').to.be.equal(3)
      expect(mappedWorkloads.communityTiers.d1.suspendedLifers, 'D1 Community Suspended Lifers total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.communityTiers.d2.suspendedLifers, 'D2 Community Suspended Lifers total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.communityTiers.d3.suspendedLifers, 'D3 Community Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.communityTiers.c0.suspendedLifers, 'C0 Community Suspended Lifers total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.communityTiers.c1.suspendedLifers, 'C1 Community Suspended Lifers total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.communityTiers.c2.suspendedLifers, 'C2 Community Suspended Lifers total should equal 3').to.be.equal(3)
      expect(mappedWorkloads.communityTiers.c3.suspendedLifers, 'C3 Community Suspended Lifers total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.licenseTiers.b2.suspendedLifers, 'B2 Licence Suspended Lifers total should equal 5').to.be.equal(5)
      expect(mappedWorkloads.licenseTiers.b1.suspendedLifers, 'B1 Licence Suspended Lifers total should equal 3').to.be.equal(3)
      expect(mappedWorkloads.communityTiers.a2.suspendedLifers, 'A2 Community Suspended Lifers total should equal 2').to.be.equal(2)
    })

    it('should create a valid mapped workload with the correct filtered community tiers', function () {
      expect(mappedWorkloads.filteredCommunityTiers.untiered.total, 'Untiered Community total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.filteredCommunityTiers.d0.total, 'D0 Community total should equal 0').to.be.equal(0)
      expect(mappedWorkloads.filteredCommunityTiers.d1.total, 'D1 Community total should equal 1').to.be.equal(1)
      expect(mappedWorkloads.filteredCommunityTiers.d2.total, 'D2 Community total should equal 2').to.be.equal(2)
      expect(mappedWorkloads.filteredCommunityTiers.d3.total, 'D3 Community total should equal 3').to.be.equal(3)
      expect(mappedWorkloads.filteredCommunityTiers.c0.total, 'C0 Community total should equal 4').to.be.equal(4)
      expect(mappedWorkloads.filteredCommunityTiers.c1.total, 'C1 Community total should equal 5').to.be.equal(5)
      expect(mappedWorkloads.filteredCommunityTiers.c2.total, 'C2 Community total should equal 6').to.be.equal(6)
      expect(mappedWorkloads.filteredCommunityTiers.c3.total, 'C3 Community total should equal 7').to.be.equal(7)
      expect(mappedWorkloads.filteredCommunityTiers.b0.total, 'B0 Community total should equal 8').to.be.equal(8)
      expect(mappedWorkloads.filteredCommunityTiers.b1.total, 'B1 Community total should equal 9').to.be.equal(9)
      expect(mappedWorkloads.filteredCommunityTiers.b2.total, 'B2 Community total should equal 10').to.be.equal(10)
      expect(mappedWorkloads.filteredCommunityTiers.b3.total, 'B3 Community total should equal 11').to.be.equal(11)
      expect(mappedWorkloads.filteredCommunityTiers.a0.total, 'A0 Community total should equal 12').to.be.equal(12)
      expect(mappedWorkloads.filteredCommunityTiers.a1.total, 'A1 Community total should equal 13').to.be.equal(13)
      expect(mappedWorkloads.filteredCommunityTiers.a2.total, 'B2 Community total should equal 14').to.be.equal(14)
      expect(mappedWorkloads.filteredCommunityTiers.a3.total, 'A3 Community total should equal 15').to.be.equal(15)
      expect(mappedWorkloads.filteredCommunityTiers.total, 'Community overall filtered total should equal 120').to.be.equal(120)
    })

    it('should create a valid mapped workload with the correct filtered custody tiers', function () {
      // 39+ 40+ 41+ 42+ 43+ 44+ 45+ 46+ 47+ 48+ 49+ 50+ 51+ 52+ 53+ 54+ 55
      expect(mappedWorkloads.filteredCustodyTiers.untiered.total, 'Untiered Custody total should equal 39').to.be.equal(39)
      expect(mappedWorkloads.filteredCustodyTiers.d0.total, 'D0 Custody total should equal 40').to.be.equal(40)
      expect(mappedWorkloads.filteredCustodyTiers.d1.total, 'D1 Custody total should equal 41').to.be.equal(41)
      expect(mappedWorkloads.filteredCustodyTiers.d2.total, 'D2 Custody total should equal 42').to.be.equal(42)
      expect(mappedWorkloads.filteredCustodyTiers.d3.total, 'D3 Custody total should equal 43').to.be.equal(43)
      expect(mappedWorkloads.filteredCustodyTiers.c0.total, 'C0 Custody total should equal 44').to.be.equal(44)
      expect(mappedWorkloads.filteredCustodyTiers.c1.total, 'C1 Custody total should equal 45').to.be.equal(45)
      expect(mappedWorkloads.filteredCustodyTiers.c2.total, 'C2 Custody total should equal 46').to.be.equal(46)
      expect(mappedWorkloads.filteredCustodyTiers.c3.total, 'C3 Custody total should equal 47').to.be.equal(47)
      expect(mappedWorkloads.filteredCustodyTiers.b0.total, 'B0 Custody total should equal 48').to.be.equal(48)
      expect(mappedWorkloads.filteredCustodyTiers.b1.total, 'B1 Custody total should equal 49').to.be.equal(49)
      expect(mappedWorkloads.filteredCustodyTiers.b2.total, 'B2 Custody total should equal 50').to.be.equal(50)
      expect(mappedWorkloads.filteredCustodyTiers.b3.total, 'B3 Custody total should equal 51').to.be.equal(51)
      expect(mappedWorkloads.filteredCustodyTiers.a0.total, 'A0 Custody total should equal 52').to.be.equal(52)
      expect(mappedWorkloads.filteredCustodyTiers.a1.total, 'A1 Custody total should equal 53').to.be.equal(53)
      expect(mappedWorkloads.filteredCustodyTiers.a2.total, 'A2 Custody total should equal 54').to.be.equal(54)
      expect(mappedWorkloads.filteredCustodyTiers.a3.total, 'A3 Custody total should equal 55').to.be.equal(55)
      expect(mappedWorkloads.filteredCustodyTiers.total, 'Custody overall filtered total should equal 799').to.be.equal(799)
    })

    it('should create a valid mapped workload with the correct filtered licence tiers', function () {
      expect(mappedWorkloads.filteredLicenseTiers.untiered.total, 'Untiered Licence total should equal 9').to.be.equal(19)
      expect(mappedWorkloads.filteredLicenseTiers.d0.total, 'D0 Licence total should equal 40').to.be.equal(20)
      expect(mappedWorkloads.filteredLicenseTiers.d1.total, 'D1 Licence total should equal 41').to.be.equal(21)
      expect(mappedWorkloads.filteredLicenseTiers.d2.total, 'D2 Licence total should equal 42').to.be.equal(22)
      expect(mappedWorkloads.filteredLicenseTiers.d3.total, 'D3 Licence total should equal 43').to.be.equal(23)
      expect(mappedWorkloads.filteredLicenseTiers.c0.total, 'C0 Licence total should equal 44').to.be.equal(24)
      expect(mappedWorkloads.filteredLicenseTiers.c1.total, 'C1 Licence total should equal 45').to.be.equal(25)
      expect(mappedWorkloads.filteredLicenseTiers.c2.total, 'C2 Licence total should equal 46').to.be.equal(26)
      expect(mappedWorkloads.filteredLicenseTiers.c3.total, 'C3 Licence total should equal 47').to.be.equal(27)
      expect(mappedWorkloads.filteredLicenseTiers.b0.total, 'B0 Licence total should equal 48').to.be.equal(28)
      expect(mappedWorkloads.filteredLicenseTiers.b1.total, 'B1 Licence total should equal 49').to.be.equal(29)
      expect(mappedWorkloads.filteredLicenseTiers.b2.total, 'B2 Licence total should equal 50').to.be.equal(30)
      expect(mappedWorkloads.filteredLicenseTiers.b3.total, 'B3 Licence total should equal 51').to.be.equal(31)
      expect(mappedWorkloads.filteredLicenseTiers.a0.total, 'A0 Licence total should equal 52').to.be.equal(32)
      expect(mappedWorkloads.filteredLicenseTiers.a1.total, 'A1 Licence total should equal 53').to.be.equal(33)
      expect(mappedWorkloads.filteredLicenseTiers.a2.total, 'A2 Licence total should equal 54').to.be.equal(34)
      expect(mappedWorkloads.filteredLicenseTiers.a3.total, 'A3 Licence total should equal 55').to.be.equal(35)
      expect(mappedWorkloads.filteredLicenseTiers.total, 'Licence overall filtered total should equal 459').to.be.equal(459)
    })
  })
})
