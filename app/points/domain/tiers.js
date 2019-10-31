const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('./tier-counts')

class Tiers {
  constructor (location, untiered, d2, d1, c2, c1, b2, b1, a, e, f, g, total) {
    this.location = location // Community, Custody or Licence/License
    this.untiered = untiered // Tier 0
    this.d2 = d2 // Tier 1
    this.d1 = d1 // Tier 2
    this.c2 = c2 // Tier 3
    this.c1 = c1 // Tier 4
    this.b2 = b2 // Tier 5
    this.b1 = b1 // Tier 6
    this.a = a // Tier 7
    this.e = e // Tier 8
    this.f = f // Tier 9
    this.g = g // Tier 10
    this.total = total
    this.isValid()
  }

  isValid () {
    assertObjectType(this.a, TierCounts, 'TierCounts a')
    assertObjectType(this.b1, TierCounts, 'TierCounts b1')
    assertObjectType(this.b2, TierCounts, 'TierCounts b2')
    assertObjectType(this.c1, TierCounts, 'TierCounts c1')
    assertObjectType(this.c2, TierCounts, 'TierCounts c2')
    assertObjectType(this.d1, TierCounts, 'TierCounts d1')
    assertObjectType(this.d2, TierCounts, 'TierCounts d2')
    assertObjectType(this.e, TierCounts, 'TierCounts e')
    assertObjectType(this.f, TierCounts, 'TierCounts f')
    assertObjectType(this.g, TierCounts, 'TierCounts g')
    assertObjectType(this.untiered, TierCounts, 'TierCounts untiered')
    assertLocation(this.location, 'location')
  }

  getTiersAsList () {
    var list = [
      this.d2,
      this.d1,
      this.c2,
      this.c1,
      this.b2,
      this.b1,
      this.a,
      this.e,
      this.f,
      this.g,
      this.untiered
    ]
    return list
  }
}

module.exports = Tiers
