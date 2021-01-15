const expect = require('chai').expect
const mapper = require('../../../app/context-map/court-reports')
const stagingHelper = require('../../helpers/staging-helper')

describe('context-map/court-reports', function () {
  const omKey = '1234'
  const stagingCourtReports = stagingHelper.getTestOmCourtReports(omKey)
  const ownerId = 10
  const workloadReportId = 5

  it('should validate the parameters are as expected', function () {
    expect(() => mapper({}, ownerId, workloadReportId)).to.throw(Error)
    expect(() => mapper(stagingCourtReports, undefined, workloadReportId)).to.throw(Error)
    expect(() => mapper(stagingCourtReports, ownerId, undefined)).to.throw(Error)
    expect(() => mapper(stagingCourtReports, undefined, undefined)).to.throw(Error)
    expect(() => mapper(stagingCourtReports, ownerId, workloadReportId)).not.to.throw(Error)
  })

  it('should correctly map the staging id field', function () {
    expect(mapper(stagingCourtReports, ownerId, workloadReportId).stagingId).to.equal(stagingCourtReports.stagingId)
  })

  it('should correctly map the workload report id field', function () {
    expect(mapper(stagingCourtReports, ownerId, workloadReportId).workloadReportId).to.equal(workloadReportId)
  })

  describe('court report fields', function () {
    const mappedCourtReports = mapper(stagingCourtReports, ownerId, workloadReportId)

    it('correctly maps total fdrs', function () {
      expect(mappedCourtReports.totalSdrs).to.eq(parseInt(stagingCourtReports.courtReports.sdrLast30))
    })

    it('correctly maps total sdrs', function () {
      expect(mappedCourtReports.totalFdrs).to.eq(parseInt(stagingCourtReports.courtReports.sdrConvLast30))
    })

    it('correctly maps total oral reports', function () {
      expect(mappedCourtReports.totalOralReports).to.eq(parseInt(stagingCourtReports.courtReports.oralReports))
    })
  })
})
