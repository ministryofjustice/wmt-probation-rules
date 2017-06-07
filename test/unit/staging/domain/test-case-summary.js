const expect = require('chai').expect
const Tiers = require('../../../../app/staging/domain/tiers')
const stagingHelper = require('../../../helpers/staging-helper')
const moment = require('moment')

describe('points/domain/staging/case-summary', function () {
  it('should allow all fields to be retrieved', function () {
    var omKey = '1234'
    var datestamp = moment.toString()
    var caseSummary = stagingHelper.getTestCaseSummary(omKey, datestamp)
    expect(caseSummary.omKey).to.equal(omKey)
    expect(caseSummary.datestamp).to.equal(datestamp)
    expect(caseSummary.trust).to.be.a('string')
    expect(caseSummary.regionCode).to.be.a('string')
    expect(caseSummary.regionDesc).to.be.a('string')
    expect(caseSummary.lduCode).to.be.a('string')
    expect(caseSummary.lduDesc).to.be.a('string')
    expect(caseSummary.teamCode).to.be.a('string')
    expect(caseSummary.teamDesc).to.be.a('string')
    expect(caseSummary.omForename).to.be.a('string')
    expect(caseSummary.omSurname).to.be.a('string')
    expect(caseSummary.omGradeCode).to.be.a('string')
    expect(caseSummary.communityTiers).to.be.an.instanceof(Tiers)
    expect(caseSummary.licenseTiers).to.be.an.instanceof(Tiers)
    expect(caseSummary.custodyTiers).to.be.an.instanceof(Tiers)
    expect(caseSummary.comIn1st16Weeks).to.be.a('string')
    expect(caseSummary.licIn1st16Weeks).to.be.a('string')
  })
})
