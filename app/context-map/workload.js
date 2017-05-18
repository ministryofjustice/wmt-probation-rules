const Workload = require('../points/domain/workload')
const mapToTiers = require('./tiers')
const Locations = require('../../app/staging/constants/locations')

module.exports = function (communityTierCounts, custodyTierCounts, licenseTierCounts) {
  let custodyTiersObject = mapToTiers(Locations.CUSTODY, ...custodyTierCounts)
  let communityTiersObject = mapToTiers(Locations.COMMUNITY, ...communityTierCounts)
  let licenseTiersObject = mapToTiers(Locations.LICENSE, ...licenseTierCounts)

  let workload = new Workload(custodyTiersObject, communityTiersObject, licenseTiersObject)

  return workload
}
