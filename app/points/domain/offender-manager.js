const assertNumber = require('./validation/assert-number')
const assertExists = require('./validation/assert-exists')

class OffenderManager {
  constructor (id, omKey, omForename, omSurname, omTypeId, omGradeCode) {
    this.id = id
    this.omKey = omKey
    this.omForename = omForename
    this.omSurname = omSurname
    this.omTypeId = omTypeId
    this.omGradeCode = omGradeCode
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertExists(this.omKey, 'omKey')
  }
}

module.exports = OffenderManager
