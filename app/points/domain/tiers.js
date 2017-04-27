const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const Tier = require('./tier.js')

class Tiers {
  constructor (location, tierCount, untiered, d2, d1, c2, c1, b2, b1, a, a1, a3) {
    this.location = location
    this.untiered = untiered
    this.d2 = d2
    this.d1 = d1
    this.c2 = c2
    this.c1 = c1
    this.b2 = b2
    this.b1 = b1
    this.a = a
    this.a1 = a1
    this.a3 = a3
    this.isValid()
  }

  isValid () {
    assertObjectType(this.a, Tier, 'Tier')
    assertObjectType(this.b1, Tier, 'Tier')
    assertObjectType(this.b2, Tier, 'Tier')
    assertObjectType(this.c1, Tier, 'Tier')
    assertObjectType(this.c2, Tier, 'Tier')
    assertObjectType(this.d1, Tier, 'Tier')
    assertObjectType(this.d2, Tier, 'Tier')
    assertObjectType(this.a1, Tier, 'a1')
    assertObjectType(this.a3, Tier, 'a3')
    assertObjectType(this.untiered, Tier, 'Tier')
    assertLocation(this.location, 'location')

    // TODO: Add in further validation for other fields
  }

  getTierCountsAsList () {
    var list = [
      this.a, this.b1, this.b2, this.c1, this.c2, this.d1, this.d2, this.untiered
    ]
    return list
  }
}

module.exports = Tiers
