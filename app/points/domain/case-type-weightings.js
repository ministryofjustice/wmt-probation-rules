const assertNumber = require('./validation/assert-number')

class CaseTypeWeightings {
  constructor (warrants, unpaidWork, overdueTermination) {
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.isValid()
  }

  isValid () {
    assertNumber(this.warrants)
    assertNumber(this.unpaidWork)
    assertNumber(this.overdueTermination)
  }
}

module.exports = CaseTypeWeightings
