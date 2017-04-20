const expect = require('chai').expect
const stagingHelper = require('../../../helpers/staging-helper')
const CasesSummary = require('../../../../app/staging/domain/cases-summary')
const CaseDetails = require('../../../../app/staging/domain/case-details')
const CourtReport = require('../../../../app/staging/domain/court-report')
const InstReport = require('../../../../app/staging/domain/institutional-report')
const moment = require('moment')

describe('points/domain/staging/om-workload', function () {
  it('should allow all fields to be retrieved', function () {
    var omKey = '1234'
    var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
    var timestamp = moment.toString()
    var omWorkload = stagingHelper.getTestOmWorkload(omKey, caseRefNo, timestamp)
    expect(omWorkload.casesSummary).to.be.instanceOf(CasesSummary)
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
