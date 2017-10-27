 /* eslint-disable no-new */
const expect = require('chai').expect
const Workload = require('../../../../app/points/domain/workload')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Workload', function () {
  var workloadOwnerId = 1
  var stagingId = 10
  var totalCases = 1
  var monthlySdrs = 9
  var sdrsDueNext30Days = 8
  var paromsCompletedLast30Days = 6
  var paromsDueNext30Days = 5
  var custodyTiers = pointsHelper.getTestTiersObject(Locations.CUSTODY)
  var communityTiers = pointsHelper.getTestTiersObject(Locations.COMMUNITY)
  var licenseTiers = pointsHelper.getTestTiersObject(Locations.LICENSE)
  var workloadReportId = 11
  var armsCommunityCases = 2
  var armsLicenseCases = 1
  var licenseCasesLast16Weeks = 4
  var communityCasesLast16Weeks = 3

  var validArgumentList = [
    workloadOwnerId,
    totalCases,
    monthlySdrs,
    sdrsDueNext30Days,
    paromsCompletedLast30Days,
    paromsDueNext30Days,
    custodyTiers,
    communityTiers,
    licenseTiers,
    stagingId,
    workloadReportId
  ]

  it('throws an error when any property is undefined', function () {
    var args
    for (var i = 0; i < validArgumentList.length; i++) {
      args = validArgumentList.slice(0)
      args[i] = undefined
      expect(() => new Workload(...args)).to.throw(Error)
    }
  })

  it('all fields can be retrieved', function () {
    var workload = pointsHelper.getTestWorkloadObject()
    expect(workload.workloadOwnerId).to.eql(workloadOwnerId)
    expect(workload.totalCases).to.eql(totalCases)
    expect(workload.monthlySdrs).to.eql(monthlySdrs)
    expect(workload.sdrsDueNext30Days).to.eql(sdrsDueNext30Days)
    expect(workload.paromsCompletedLast30Days).to.eql(paromsCompletedLast30Days)
    expect(workload.paromsDueNext30Days).to.eql(paromsDueNext30Days)
    expect(workload.custodyTiers).to.be.an('object')
    expect(workload.communityTiers).to.be.an('object')
    expect(workload.licenseTiers).to.be.an('object')
    expect(workload.communityCasesLast16Weeks).to.eql(communityCasesLast16Weeks)
    expect(workload.licenseCasesLast16Weeks).to.eql(licenseCasesLast16Weeks)
    expect(workload.armsCommunityCases).to.eql(armsCommunityCases)
    expect(workload.armsLicenseCases).to.eql(armsLicenseCases)
    expect(workload.stagingId).to.eql(stagingId)
    expect(workload.workloadReportId).to.eql(workloadReportId)
  })
})
