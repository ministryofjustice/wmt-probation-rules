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
  }
}

module.exports = Tier
