const assertNumber = require('./validation/assert-number')
const assertObjectType = require('./validation/assert-object-type')
const TierCount = require('./tier-counts.js')

class Tier {
  constructor (tierCount, points) {
    this.tierCount = tierCount
    this.points = points
    this.isValid()
  }

  isValid () {
    assertObjectType(this.tierCount, TierCount, 'TierCount')
    assertNumber(this.points, 'points')
  }
}

module.exports = Tier
