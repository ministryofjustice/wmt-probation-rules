const assertNumber = require('./validation/assert-number')

class DefaultContractedHours {
  constructor (psoHours, poHours) {
    this.pso = psoHours
    this.po = poHours
    this.isValid()
  }
  isValid () {
    assertNumber(this.pso, 'PSO')
    assertNumber(this.po, 'other')
  }
}

module.exports = DefaultContractedHours
