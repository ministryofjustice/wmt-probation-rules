const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const Tier = require('./tier.js')

class Tiers {
  constructor (location, tierCount, untiered, d2, d1, c2, c1, b2, b1, a) {
    this.location = location
    this.untiered = untiered
    this.d2 = d2
    this.d1 = d1
    this.c2 = c2
    this.c1 = c1
    this.b2 = b2
    this.b1 = b1
    this.a = a
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
    assertObjectType(this.untiered, Tier, 'Tier')
    assertLocation(this.location, 'location')

    // TODO: Add in further validation for other fields
  }
}

module.exports = Tiers
