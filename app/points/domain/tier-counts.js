const assertNumber = require('./validation/assert-number')

class TierCounts {
  constructor (total, warrants, unpaidWork, overdueTermination, suspended, t2a = false) {
    this.total = total
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.suspended = suspended
    this.t2a = t2a
    this.isValid()
  }

  isValid () {
    assertNumber(this.total, 'total')
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
    assertNumber(this.suspended, 'suspended')
  }
}

module.exports = TierCounts
