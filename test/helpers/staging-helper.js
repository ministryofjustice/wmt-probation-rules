const CaseDetails = require('../../app/points/domain/staging/case-details')
const CaseSummary = require('../../app/points/domain/staging/case-summary')
const CourtReport = require('../../app/points/domain/staging/court-report')
const InstReport = require('../../app/points/domain/staging/institutional-report')
const OmWorkload = require('../../app/points/domain/staging/om-workload')
const Tiers = require('../../app/points/domain/staging/tiers')
const locations = require('../../app/points/constants/staging/locations')
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
  return new CaseDetails('U', caseRefNo, '1', 'KNS', 'Q', omKey, location)
}

module.exports.getTestCaseSummary = function (omKey, timestamp) {
  const communityTiers = module.exports.getMultipleTestTiers(locations.COMMUNITY, 1)
  const licenseTiers = module.exports.getMultipleTestTiers(locations.LICENSE, 1)
  const custodyTiers = module.exports.getMultipleTestTiers(locations.CUSTODY, 1)

  return new CaseSummary(
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
