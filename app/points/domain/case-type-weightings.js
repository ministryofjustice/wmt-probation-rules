const assertNumber = require('./validation/assert-number')

class CaseTypeWeightings {
  constructor (warrants, unpaidWork, overdueTermination, pointsConfiguration) {
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.pointsConfiguration = pointsConfiguration
    this.isValid()
  }

  isValid () {
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
  }
}

module.exports = CaseTypeWeightings
