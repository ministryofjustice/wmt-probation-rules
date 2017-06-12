const expect = require('chai').expect
const locations = require('../../../../app/staging/constants/locations')
const stagingHelper = require('../../../helpers/staging-helper')

describe('points/domain/staging/case-details', function () {
  it('should allow all fields to be retrieved', function () {
    var caseRefNo = stagingHelper.getGeneratedCaseRefNo()
    var omKey = '1234'
    var caseDetails = stagingHelper.getTestCaseDetails(omKey)
    expect(caseDetails.rowType).to.be.a('string')
    expect(caseDetails.caseRefNo).to.be.a('string')
    expect(caseDetails.tierCode).to.be.a('string')
    expect(caseDetails.teamCode).to.be.a('string')
    expect(caseDetails.omGradeCode).to.be.a('string')
    expect(caseDetails.omKey).to.equal('1234')
    expect(caseDetails.location).to.equal(locations.COMMUNITY)
  })
})
