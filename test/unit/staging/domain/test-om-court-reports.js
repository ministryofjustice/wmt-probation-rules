const expect = require('chai').expect
const stagingHelper = require('../../../helpers/staging-helper')
const CasesSummary = require('../../../../app/staging/domain/cases-summary')
const CourtReport = require('../../../../app/staging/domain/court-report')
const moment = require('moment')

describe('points/domain/staging/om-court-reports', function () {
  it('should allow all fields to be retrieved', function () {
    var omKey = '1234'
    var timestamp = moment.toString()
    var omCourtReports = stagingHelper.getTestOmCourtReports(omKey, timestamp)

    expect(omCourtReports.stagingId).to.be.a('number')
    expect(omCourtReports.casesSummary).to.be.instanceOf(CasesSummary)
    expect(omCourtReports.courtReports).to.be.instanceOf(CourtReport)
  })
})
