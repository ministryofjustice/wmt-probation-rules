const expect = require('chai').expect
const CaseDetails = require('../../../../../app/points/domain/staging/case-details')
const locations = require('../../../../../app/points/constants/staging/locations')

describe('points/domain/staging/case-details', function () {
  it('should allow all fields to be retrieved', function () {
    var caseDetails = new CaseDetails('U', 'REF-1234', '1', 'KNS', 'Q', '1234', locations.COMMUNITY)
    expect(caseDetails.rowType).to.equal('U')
    expect(caseDetails.caseRefNo).to.equal('REF-1234')
    expect(caseDetails.tierCode).to.equal('1')
    expect(caseDetails.teamCode).to.equal('KNS')
    expect(caseDetails.omGradeCode).to.equal('Q')
    expect(caseDetails.omKey).to.equal('1234')
    expect(caseDetails.location).to.equal(locations.COMMUNITY)
  })
})
