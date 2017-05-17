const assertNumber = require('./validation/assert-number')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('../../../app/points/domain/tier-counts')

class Tier {
  constructor (tierCounts, points) {
    this.tierCounts = tierCounts
    this.points = points
    this.isValid()
  }

  isValid () {
    assertObjectType(this.tierCounts, TierCounts, 'TierCount')
    assertNumber(this.points, 'points')
  }
}

module.exports = Tier
