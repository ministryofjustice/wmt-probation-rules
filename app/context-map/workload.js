const Workload = require('../points/domain/workload')
const mapToTiers = require('./tiers')
const Locations = require('../../app/staging/constants/locations')
const assertArrayLength = require('../../app/points/domain/validation/assert-array-length')

module.exports = function (communityTierCounts, custodyTierCounts, licenseTierCounts, workloadId) {
  assertArrayLength(communityTierCounts, 'Community Tier Counts')
  assertArrayLength(communityTierCounts, 'Custody Tier Counts')
  assertArrayLength(communityTierCounts, 'License Tier Counts')
  let custodyTiersObject = mapToTiers(Locations.CUSTODY, ...custodyTierCounts)
  let communityTiersObject = mapToTiers(Locations.COMMUNITY, ...communityTierCounts)
  let licenseTiersObject = mapToTiers(Locations.LICENSE, ...licenseTierCounts)

  let workload = new Workload(custodyTiersObject, communityTiersObject, licenseTiersObject, workloadId)
  return workload
}
