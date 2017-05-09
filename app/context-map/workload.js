const Workload = require('../points/domain/workload')
const mapToTiers = require('./tiers')
const Locations = require('../../app/staging/constants/locations')

module.exports = function (communityUntiered, communityTierOne, communityTierTwo,
                           communityTierThree, communityTierFour, communityTierFive,
                           communityTierSix, communityTierSeven,
                           custodyUntiered, custodyTierOne, custodyTierTwo,
                           custodyTierThree, custodyTierFour, custodyTierFive,
                           custodyTierSix, custodyTierSeven,
                           licenseUntiered, licenseTierOne, licenseTierTwo,
                           licenseTierThree, licenseTierFour, licenseTierFive,
                           licenseTierSix, licenseTierSeven) {
  var custodyTiers = mapToTiers(Locations.CUSTODY,
                                custodyUntiered, custodyTierOne, custodyTierTwo,
                                custodyTierThree, custodyTierFour, custodyTierFive,
                                custodyTierSix, custodyTierSeven)
  var communityTiers = mapToTiers(Locations.COMMUNITY,
                                  communityUntiered, communityTierOne, communityTierTwo,
                                  communityTierThree, communityTierFour, communityTierFive,
                                  communityTierSix, communityTierSeven)
  var licenseTiers = mapToTiers(Locations.LICENSE,
                                licenseUntiered, licenseTierOne, licenseTierTwo,
                                licenseTierThree, licenseTierFour, licenseTierFive,
                                licenseTierSix, licenseTierSeven)
  var workload = new Workload(custodyTiers, communityTiers, licenseTiers)
  return workload
}
