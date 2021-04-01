const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('./tier-counts')

// WMT0229 Change needed here when extract column names are known
class Tiers {
  constructor (location, untiered, d0, d1, d2, d3, c0, c1, c2, c3, b0, b1, b2, b3, a0, a1, a2, a3, total) {
    this.location = location // Community, Custody or Licence/License
    this.untiered = untiered // Tier 0
    this.d0 = d0
    this.d1 = d1
    this.d2 = d2
    this.d3 = d3
    this.c0 = c0
    this.c1 = c1
    this.c2 = c2
    this.c3 = c3
    this.b0 = b0
    this.b1 = b1
    this.b2 = b2
    this.b3 = b3
    this.a0 = a0
    this.a1 = a1
    this.a2 = a2
    this.a3 = a3
    this.total = total
    this.isValid()
  }

  isValid () {
    assertObjectType(this.a3, TierCounts, 'TierCounts a3')
    assertObjectType(this.a2, TierCounts, 'TierCounts a2')
    assertObjectType(this.a1, TierCounts, 'TierCounts a1')
    assertObjectType(this.a0, TierCounts, 'TierCounts a0')

    assertObjectType(this.b3, TierCounts, 'TierCounts b3')
    assertObjectType(this.b2, TierCounts, 'TierCounts b2')
    assertObjectType(this.b1, TierCounts, 'TierCounts b1')
    assertObjectType(this.b0, TierCounts, 'TierCounts b0')

    assertObjectType(this.c3, TierCounts, 'TierCounts c3')
    assertObjectType(this.c2, TierCounts, 'TierCounts c2')
    assertObjectType(this.c1, TierCounts, 'TierCounts c1')
    assertObjectType(this.c0, TierCounts, 'TierCounts c0')

    assertObjectType(this.d3, TierCounts, 'TierCounts d3')
    assertObjectType(this.d2, TierCounts, 'TierCounts d2')
    assertObjectType(this.d1, TierCounts, 'TierCounts d1')
    assertObjectType(this.d0, TierCounts, 'TierCounts d0')

    assertObjectType(this.untiered, TierCounts, 'TierCounts untiered')
    assertLocation(this.location, 'location')
  }

  getTiersAsList () {
    const list = [
      this.d0,
      this.d1,
      this.d2,
      this.d3,
      this.c0,
      this.c1,
      this.c2,
      this.c3,
      this.b0,
      this.b1,
      this.b2,
      this.b3,
      this.a0,
      this.a1,
      this.a2,
      this.a3,
      this.untiered
    ]
    return list
  }
}

module.exports = Tiers
