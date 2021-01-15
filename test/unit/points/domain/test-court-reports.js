/* eslint-disable no-new */
const expect = require('chai').expect
const Workload = require('../../../../app/points/domain/workload')
const pointsHelper = require('../../../helpers/points-helper')

describe('points/domain/CourtReports', function () {
  const workloadOwnerId = 1
  const stagingId = 2
  const totalSdrs = 3
  const totalFdrs = 4
  const totalOralReports = 5
  const workloadReportId = 6

  const validArgumentList = [
    workloadOwnerId,
    totalSdrs,
    totalFdrs,
    totalOralReports,
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
    const courtReports = pointsHelper.getTestCourtReportsObject(workloadOwnerId, totalSdrs, totalFdrs, totalOralReports, stagingId, workloadReportId)
    expect(courtReports.workloadOwnerId).to.eql(workloadOwnerId)
    expect(courtReports.totalSdrs).to.eql(totalSdrs)
    expect(courtReports.totalFdrs).to.eql(totalFdrs)
    expect(courtReports.totalOralReports).to.eql(totalOralReports)
    expect(courtReports.stagingId).to.eql(stagingId)
    expect(courtReports.workloadReportId).to.eql(workloadReportId)
  })
})
