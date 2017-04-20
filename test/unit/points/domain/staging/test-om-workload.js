const expect = require('chai').expect
const stagingHelper = require('../../../../helpers/staging-helper')
const CaseSummary = require('../../../../../app/points/domain/staging/case-summary')
const CaseDetails = require('../../../../../app/points/domain/staging/case-details')
const CourtReport = require('../../../../../app/points/domain/staging/court-report')
const InstReport = require('../../../../../app/points/domain/staging/institutional-report')
const moment = require('moment')

describe('points/domain/staging/om-workload', function () {
  it('should allow all fields to be retrieved', function () {
    var omKey = '1234'
    var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
    var timestamp = moment.toString()
    var omWorkload = stagingHelper.getTestOmWorkload(omKey, caseRefNo, timestamp)
    expect(omWorkload.caseSummary).to.be.instanceOf(CaseSummary)
    expect(omWorkload.caseDetails).to.satisfy(function (cases) {
      return checkValidChildren(cases, CaseDetails)
    })
    expect(omWorkload.courtReports).to.satisfy(function (reports) {
      return checkValidChildren(reports, CourtReport)
    })
    expect(omWorkload.instReports).to.satisfy(function (reports) {
      return checkValidChildren(reports, InstReport)
    })
  })
})

function checkValidChildren (cases, type) {
  return cases.every(function (caseDetails) {
    return caseDetails instanceof type
  })
}
