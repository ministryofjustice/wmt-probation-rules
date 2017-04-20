const expect = require('chai').expect
const locations = require('../../../../../app/points/constants/staging/locations')
const stagingHelper = require('../../../../helpers/staging-helper')

describe('points/domain/staging/case-details', function () {
  it('should allow all fields to be retrieved', function () {
    var caseRefNo = 'REF-1234'
    var caseDetails = stagingHelper.getTestCaseDetails(caseRefNo, locations.COMMUNITY)
    expect(caseDetails.rowType).to.equal('U')
    expect(caseDetails.caseRefNo).to.equal('REF-1234')
    expect(caseDetails.tierCode).to.equal('1')
    expect(caseDetails.teamCode).to.equal('KNS')
    expect(caseDetails.omGradeCode).to.equal('Q')
    expect(caseDetails.omKey).to.equal('1234')
    expect(caseDetails.location).to.equal(locations.COMMUNITY)
  })
})
