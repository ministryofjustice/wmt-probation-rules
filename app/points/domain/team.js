const assertNumber = require('./validation/assert-number')
const assertEffectiveDate = require('./validation/assert-effective-date')
const assertExists = require('./validation/assert-exists')

class Team {
  constructor (id, lduId, teamCode, description, effectiveFrom, effectiveTo) {
    this.id = id
    this.lduId = lduId
    this.teamCode = teamCode
    this.description = description
    this.effectiveFrom = effectiveFrom
    this.effectiveTo = effectiveTo
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertNumber(this.lduId, 'lduId')
    assertExists(this.teamCode, 'teamCode')
    assertEffectiveDate(this.effectiveFrom, 'effectiveFrom')
    assertEffectiveDate(this.effectiveTo, 'effectiveTo')
  }
}

module.exports = Team
