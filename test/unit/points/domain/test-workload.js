/* eslint-disable no-new */
const expect = require('chai').expect
const Workload = require('../../../../app/points/domain/workload')
const pointsHelper = require('../../../helpers/points-helper')
const Locations = require('../../../../app/staging/constants/locations')

describe('points/domain/Workload', function () {
  const workloadOwnerId = 1
  const stagingId = 10
  const totalCases = 1
  const monthlySdrs = 9
  const sdrsDueNext30Days = 8
  const paromsCompletedLast30Days = 6
  const paromsDueNext30Days = 5
  const custodyTiers = pointsHelper.getTestTiersObject(Locations.CUSTODY)
  const communityTiers = pointsHelper.getTestTiersObject(Locations.COMMUNITY)
  const licenseTiers = pointsHelper.getTestTiersObject(Locations.LICENSE)
  const workloadReportId = 11
  const armsCommunityCases = 2
  const armsLicenseCases = 1
  const licenseCasesLast16Weeks = 4
  const communityCasesLast16Weeks = 3

  const validArgumentList = [
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
    let args
    for (let i = 0; i < validArgumentList.length; i++) {
      args = validArgumentList.slice(0)
      args[i] = undefined
      expect(() => new Workload(...args)).to.throw(Error)
    }
  })

  it('all fields can be retrieved', function () {
    const workload = pointsHelper.getTestWorkloadObject()
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
