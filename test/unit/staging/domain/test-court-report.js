const expect = require('chai').expect
const stagingHelper = require('../../../helpers/staging-helper')

describe('points/domain/staging/court-reports', function () {
  it('should allow all fields to be retrieved', function () {

    var omKey = 'L1FOD'
    var courtReport = stagingHelper.getTestCourtReport(omKey)
    expect(courtReport.omKey).to.be.a('string')
    expect(courtReport.omTeamStaffGrade).to.be.a('string')
    expect(courtReport.sdrLast30).to.be.a('string')
    expect(courtReport.sdrConvLast30).to.be.a('string')
    expect(courtReport.sdrDueNext30).to.be.a('string')
  })
})
