const assertObjectType = require('./validation/assert-object-type')
const Tiers = require('./tiers.js')

class Workload {
  constructor (custodyTiers, communityTiers, licenseTiers) {
    this.custodyTiers = custodyTiers
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.isValid()
  }

  isValid () {
    assertObjectType(this.custodyTiers, Tiers, 'Tiers')
    assertObjectType(this.communityTiers, Tiers, 'Tiers')
    assertObjectType(this.licenseTiers, Tiers, 'Tiers')
  }
}

module.exports = Workload
