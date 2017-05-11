const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const Tier = require('../../../app/points/domain/tier')

class Tiers {
  constructor (location, untiered, d2, d1, c2, c1, b2, b1, a) {
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
    assertObjectType(this.a, Tier, 'Tier a')
    assertObjectType(this.b1, Tier, 'Tier b1')
    assertObjectType(this.b2, Tier, 'Tier b2')
    assertObjectType(this.c1, Tier, 'Tier c1')
    assertObjectType(this.c2, Tier, 'Tier c2')
    assertObjectType(this.d1, Tier, 'Tier d1')
    assertObjectType(this.d2, Tier, 'Tier d2')
    assertObjectType(this.untiered, Tier, 'Tier untiered')
    assertLocation(this.location, 'location')
  }

  getTiersAsList () {
    var list = [
      this.a,
      this.b1,
      this.b2,
      this.c1,
      this.c2,
      this.d1,
      this.d2,
      this.untiered
    ]
    return list
  }
}

module.exports = Tiers
