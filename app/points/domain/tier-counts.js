const assertNumber = require('./validation/assert-number')

class TierCounts {
  constructor (total, warrants, unpaidWork, overdueTermination) {
    this.total = total
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.isValid()
  }

  isValid () {
    assertNumber(this.total, 'total')
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')

    if (this.total < (this.warrants + this.unpaidWork + this.overdueTermination)) {
      throw new Error('total should be greater than case subtypes')
    }
  }
}

module.exports = TierCounts
