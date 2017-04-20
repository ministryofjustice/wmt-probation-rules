const CaseDetails = require('../../app/points/domain/staging/case-details')
const CaseSummary = require('../../app/points/domain/staging/case-summary')
const Tiers = require('../../app/points/domain/staging/tiers')
const locations = require('../../app/points/constants/staging/locations')
const _ = require('lodash')

module.exports.getTestCaseDetails = function (caseRefNo, location) {
  return new CaseDetails('U', caseRefNo, '1', 'KNS', 'Q', '1234', location)
}

module.exports.getTestCaseSummary = function (omKey, timestamp) {
  const communityTiers = getTestTiers(locations.COMMUNITY, 1)
  const licenseTiers = getTestTiers(locations.LICENSE, 1)
  const custodyTiers = getTestTiers(locations.CUSTODY, 1)

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

function getTestTiers (location, count) {
  var tiers = []
  _.times(count, function () {
    tiers.push(new Tiers(locations, 0, getRandomTierCount(), getRandomTierCount(), getRandomTierCount(), getRandomTierCount(), getRandomTierCount(), getRandomTierCount(), getRandomTierCount()))
  })
  return tiers
}

function getRandomRegionCode () {
  var index = Math.floor(Math.random() * 7) + 1
  return `N${index}`
}

function getRandomTierCount () {
  return Math.floor(Math.random() * 30) + 1
}
