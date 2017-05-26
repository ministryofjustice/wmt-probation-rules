const assertNumber = require('./validation/assert-number')
const assertEffectiveDate = require('./validation/assert-effective-date')

class Team {
  constructor (id, lduId, description, effectiveFrom, effectiveTo) {
    this.id = id
    this.lduId = lduId
    this.description = description
    this.effectiveFrom = effectiveFrom
    this.effectiveTo = effectiveTo
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertNumber(this.lduId, 'lduId')
    assertEffectiveDate(this.effectiveFrom, 'effectiveFrom')
    assertEffectiveDate(this.effectiveTo, 'effectiveTo')
  }
}

module.exports = Team
