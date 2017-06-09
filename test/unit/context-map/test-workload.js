const expect = require('chai').expect
const mapper = require('../../../app/context-map/workload')
const stagingHelper = require('../../helpers/staging-helper')
const Locations = require('../../../app/staging/constants/locations')
const Tiers = require('../../../app/points/domain/tiers')

describe('context-map/workload', function () {
  var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
  var omKey = '1234'
  var stagingWorkload = stagingHelper.getTestOmWorkload(caseRefNo, omKey, Locations.COMMUNITY)
  var ownerId = 10

  it('should validate the parameters are as expected', function () {
    expect(() => mapper({}, ownerId)).to.throw(Error)
    expect(() => mapper(stagingWorkload, undefined)).to.throw(Error)
    expect(() => mapper(stagingWorkload, ownerId)).not.to.throw(Error)
  })

  describe('case summary fields', function () {
    var communityTiers = stagingHelper.getTestTiers(Locations.COMMUNITY)
    var custodyTiers = stagingHelper.getTestTiers(Locations.CUSTODY)
    var licenseTiers = stagingHelper.getTestTiers(Locations.LICENSE)

    stagingWorkload.casesSummary.communityTiers = communityTiers
    stagingWorkload.casesSummary.custodyTiers = custodyTiers
    stagingWorkload.casesSummary.licenseTiers = licenseTiers

    var mappedWorkload = mapper(stagingWorkload, ownerId)

    it('should correctly map the workload owner id', function () {
      expect(mappedWorkload.workloadOwnerId).to.equal(ownerId)
    })

    it('should correctly calculate the total number of cases', function () {
      var workloadWith24Cases = stagingHelper.getTestOmWorkload(caseRefNo, omKey, undefined)
      workloadWith24Cases.casesSummary.communityTiers = stagingHelper.getCountableTestTiers(Locations.COMMUNITY)
      workloadWith24Cases.casesSummary.custodyTiers = stagingHelper.getCountableTestTiers(Locations.CUSTODY)
      workloadWith24Cases.casesSummary.licenseTiers = stagingHelper.getCountableTestTiers(Locations.LICENSE)

      var mappedWorkloadWith24Cases = mapper(workloadWith24Cases, ownerId)

      expect(mappedWorkloadWith24Cases.totalCases).to.equal(24)
    })

    it('should correct map the license first 16 week count', function () {
      expect(mappedWorkload.license16WeekCount).to.equal(parseInt(stagingWorkload.casesSummary.licIn1st16Weeks))
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

      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.CUSTODY, 'W', tierCode.toString(), tierSeed + activeWarrantsSeed + custodyMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.CUSTODY, 'U', tierCode.toString(), tierSeed + unpaidWorkSeed + custodyMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.CUSTODY, 'O', tierCode.toString(), tierSeed + overdueTerminationsSeed + custodyMultiplier))

      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.LICENSE, 'W', tierCode.toString(), tierSeed + activeWarrantsSeed + licenseMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.LICENSE, 'U', tierCode.toString(), tierSeed + unpaidWorkSeed + licenseMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.LICENSE, 'O', tierCode.toString(), tierSeed + overdueTerminationsSeed + licenseMultiplier))

      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.COMMUNITY, 'W', tierCode.toString(), tierSeed + activeWarrantsSeed + communityMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.COMMUNITY, 'U', tierCode.toString(), tierSeed + unpaidWorkSeed + communityMultiplier))
      caseDetails.push(...stagingHelper.getMultipleTestCaseDetails(caseRefNo, omKey, Locations.COMMUNITY, 'O', tierCode.toString(), tierSeed + overdueTerminationsSeed + communityMultiplier))
    }

    stagingWorkload.caseDetails = caseDetails
    var mappedWorkload = mapper(stagingWorkload, ownerId)

    it('should correctly map the custody overdue terminations', function () {
      expect(mappedWorkload.custodyTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + custodyMultiplier)
    })

    it('should correctly map the custody active warrants', function () {
      expect(mappedWorkload.custodyTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + custodyMultiplier)
    })

    it('should correctly map the custody unpaid work', function () {
      expect(mappedWorkload.custodyTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + custodyMultiplier)
      expect(mappedWorkload.custodyTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + custodyMultiplier)
    })

    it('should correctly map the community overdue terminations', function () {
      expect(mappedWorkload.communityTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + communityMultiplier)
    })

    it('should correctly map the community active warrants', function () {
      expect(mappedWorkload.communityTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + communityMultiplier)
    })

    it('should correctly map the community unpaid work', function () {
      expect(mappedWorkload.communityTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + communityMultiplier)
      expect(mappedWorkload.communityTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + communityMultiplier)
    })

    it('should correctly map the license overdue terminations', function () {
      expect(mappedWorkload.licenseTiers.untiered.overdueTermination).to.eq(1 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.overdueTermination).to.eq(2 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.overdueTermination).to.eq(3 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.overdueTermination).to.eq(4 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.overdueTermination).to.eq(5 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.overdueTermination).to.eq(6 + overdueTerminationsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.overdueTermination).to.eq(7 + overdueTerminationsSeed + licenseMultiplier)
    })

    it('should correctly map the license active warrants', function () {
      expect(mappedWorkload.licenseTiers.untiered.warrants).to.eq(1 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.warrants).to.eq(2 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.warrants).to.eq(3 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.warrants).to.eq(4 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.warrants).to.eq(5 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.warrants).to.eq(6 + activeWarrantsSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.warrants).to.eq(7 + activeWarrantsSeed + licenseMultiplier)
    })

    it('should correctly map the license unpaid work', function () {
      expect(mappedWorkload.licenseTiers.untiered.unpaidWork).to.eq(1 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d2.unpaidWork).to.eq(2 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.d1.unpaidWork).to.eq(3 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c2.unpaidWork).to.eq(4 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.c1.unpaidWork).to.eq(5 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b2.unpaidWork).to.eq(6 + unpaidWorkSeed + licenseMultiplier)
      expect(mappedWorkload.licenseTiers.b1.unpaidWork).to.eq(7 + unpaidWorkSeed + licenseMultiplier)
    })
  })

  describe('court report fields', function () {
    var mappedWorkload = mapper(stagingWorkload, ownerId)

    it('correctly maps monthly SDRs', function () {
      expect(mappedWorkload.monthlySdrs).to.eq(parseInt(stagingWorkload.courtReports[0].sdrLast30))
    })

    it('correctly maps SDRs due next 30 days', function () {
      expect(mappedWorkload.sdrsDueNext30Days).to.eq(parseInt(stagingWorkload.courtReports[0].sdrDueNext30))
    })
  })

  describe('institutional report fields', function () {
    var mappedWorkload = mapper(stagingWorkload, ownerId)

    it('correctly maps paroms completed last 30 days', function () {
      expect(mappedWorkload.paromsCompletedLast30Days).to.eq(parseInt(stagingWorkload.instReports[0].paromCompLast30))
    })

    it('correctly maps paroms due next 30 days', function () {
      expect(mappedWorkload.paromsDueNext30Days).to.eq(parseInt(stagingWorkload.instReports[0].paromDueNext30))
    })
  })

})
