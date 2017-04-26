const assertNumber = require('./validation/assert-number')

class DefaultContractedHours {
  constructor (psoHours, otherHours) {
    this.pso = psoHours
    this.other = otherHours
    this.isValid()
  }
  isValid () {
    assertNumber(this.pso, 'PSO')
    assertNumber(this.other, 'other')
  }
}

module.exports = DefaultContractedHours
