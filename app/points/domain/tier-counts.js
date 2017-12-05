const assertNumber = require('./validation/assert-number')

class TierCounts {
  constructor (total, warrants, unpaidWork, overdueTermination, suspended) {
    this.total = total
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.suspended = suspended
    this.isValid()
  }

  isValid () {
    assertNumber(this.total, 'total')
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
    assertNumber(this.suspended, 'suspended')

    if (this.total < (this.warrants + this.unpaidWork + this.overdueTermination)) {
      throw new Error('total should be greater than case subtypes')
    }
  }
}

module.exports = TierCounts
