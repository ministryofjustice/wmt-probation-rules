const assertNumber = require('./validation/assert-number')

class TierTotals {
  constructor (caseCount, warrantCaseCount, unpaidWorkCaseCount, overdueTerminationCaseCount) {
    this.caseCount = caseCount
    this.warrantCaseCount = warrantCaseCount
    this.unpaidWorkCaseCount = unpaidWorkCaseCount
    this.overdueTerminationCaseCount = overdueTerminationCaseCount
    this.isValid()
  }

  isValid () {
    assertNumber(this.caseCount, 'caseCount')
    assertNumber(this.warrantCaseCount, 'warrantCaseCount')
    assertNumber(this.unpaidWorkCaseCount, 'unpaidWorkCaseCount')
    assertNumber(this.overdueTerminationCaseCount, 'overdueTerminationCaseCount')

    if (this.caseCount < (this.warrantCaseCount + this.unpaidWorkCaseCount + this.overdueTerminationCaseCount)) {
      throw new Error('caseCount should be greater than case subtypes')
    }
  }
}

module.exports = TierTotals
