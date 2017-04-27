const assertNumber = require('./validation/assert-number')

class CaseTypeWeightings {
  constructor (warrants, unpaidWork, overdueTermination, commTierCPWeighting = 0) {
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.commTierCPWeighting = commTierCPWeighting
    this.isValid()
  }

  isValid () {
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
  }
}

module.exports = CaseTypeWeightings
