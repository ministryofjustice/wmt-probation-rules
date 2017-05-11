const Workload = require('../points/domain/workload')
const mapToTiers = require('./tiers')
const Locations = require('../../app/staging/constants/locations')

module.exports = function (communityTierCounts, custodyTierCounts, licenseTierCounts) {
  var custodyTiersObject = mapToTiers(Locations.CUSTODY,
                                custodyTierCounts[0], custodyTierCounts[1], custodyTierCounts[2],
                                custodyTierCounts[3], custodyTierCounts[4], custodyTierCounts[5],
                                custodyTierCounts[6], custodyTierCounts[7])
  var communityTiersObject = mapToTiers(Locations.COMMUNITY,
                                  communityTierCounts[0], communityTierCounts[1], communityTierCounts[2],
                                  communityTierCounts[4], communityTierCounts[4], communityTierCounts[5],
                                  communityTierCounts[6], communityTierCounts[7])
  var licenseTiersObject = mapToTiers(Locations.LICENSE,
                                licenseTierCounts[0], licenseTierCounts[1], licenseTierCounts[2],
                                licenseTierCounts[3], licenseTierCounts[4], licenseTierCounts[5],
                                licenseTierCounts[6], licenseTierCounts[7])
  var workload = new Workload(custodyTiersObject, communityTiersObject, licenseTiersObject)
  return workload
}
