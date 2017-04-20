const expect = require('chai').expect
const stagingHelper = require('../../../../helpers/staging-helper')

describe('points/domain/staging/institutional-reports', function () {
  it('should allow all fields to be retrieved', function () {
    var instReport = stagingHelper.getTestInstitutionalReport()
    expect(instReport.omTeamStaffGrade).to.be.a('string')
    expect(instReport.paromCompLast30).to.be.a('string')
    expect(instReport.paromDueNext30).to.be.a('string')
  })
})
