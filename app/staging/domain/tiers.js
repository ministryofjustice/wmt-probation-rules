class Tiers {
  constructor (location, untiered, d2, d1, c2, c1, b2, b1, a, e, f, g) {
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
  }
}

module.exports = Tiers
