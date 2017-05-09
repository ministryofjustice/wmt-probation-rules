const assertNumber = require('./validation/assert-number')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('../../../app/points/domain/tier-counts')

class Tier {
  constructor (tierCount, points) {
    this.tierCount = tierCount
    this.points = points
    this.isValid()
  }

  isValid () {
    assertObjectType(this.tierCount, TierCounts, 'TierCount')
    assertNumber(this.points, 'points')
  }
}

module.exports = Tier
