const CaseDetails = require('../../app/staging/domain/case-details')
const CasesSummary = require('../../app/staging/domain/cases-summary')
const CourtReport = require('../../app/staging/domain/court-report')
const InstReport = require('../../app/staging/domain/institutional-report')
const OmWorkload = require('../../app/staging/domain/om-workload')
const Tiers = require('../../app/staging/domain/tiers')
const locations = require('../../app/staging/constants/locations')
const _ = require('lodash')

module.exports.getTestOmWorkload = function (omKey, caseRefNo, timestamp) {
  var omWorkload = new OmWorkload(
    this.getTestCaseSummary(omKey, timestamp),
    [this.getTestCourtReport()],
    [this.getTestInstitutionalReport()],
    [this.getTestCaseDetails(caseRefNo, omKey, locations.COMMUNITY), this.getTestCaseDetails(caseRefNo, omKey, locations.LICENSE), this.getTestCaseDetails(caseRefNo, omKey, locations.CUSTODY)]
  )
  return omWorkload
}

module.exports.getTestInstitutionalReport = function () {
  return new InstReport('KNSQ', getRandomPoints(), getRandomPoints())
}

module.exports.getTestCourtReport = function () {
  return new CourtReport('KNSQ', getRandomPoints(), getRandomPoints(), getRandomPoints())
}

module.exports.getTestCaseDetails = function (caseRefNo, omKey, location) {
  return new CaseDetails(getRandomRowType(), caseRefNo, '1', 'KNS', 'Q', omKey, location)
}

module.exports.getTestCaseSummary = function (omKey, timestamp) {
  const communityTiers = module.exports.getMultipleTestTiers(locations.COMMUNITY, 1)
  const licenseTiers = module.exports.getMultipleTestTiers(locations.LICENSE, 1)
  const custodyTiers = module.exports.getMultipleTestTiers(locations.CUSTODY, 1)

  return new CasesSummary(
    'Trust',
    'Region description',
    getRandomRegionCode(),
    'LDU description',
    'LDU',
    'Team description',
    'KNS',
    'Testing',
    'Tom',
    'Q',
    omKey,
    communityTiers,
    licenseTiers,
    custodyTiers,
    '15',
    '11',
    timestamp)
}

module.exports.getGeneratedCaseRefNo = function () {
  var refno = Math.floor(Math.random() * 90000) + 10000
  return `REF-${refno}`
}

module.exports.getMultipleTestTiers = function (location, count) {
  var tiers = []
  _.times(count, function () {
    tiers.push(module.exports.getTestTiers(location))
  })
  return tiers
}

module.exports.getTestTiers = function (location) {
  return new Tiers(location, '0', getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints(), getRandomPoints())
}

function getRandomRegionCode () {
  var index = Math.floor(Math.random() * 7) + 1
  return `N${index}`
}

function getRandomPoints () {
  return (Math.floor(Math.random() * 30) + 1).toString()
}

function getRandomRowType () {
  const tierCodes = ['U', 'W', 'O', '']
  return tierCodes[Math.floor(Math.random() * tierCodes.length)]
}
