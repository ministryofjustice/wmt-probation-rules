const assertNumber = require('./validation/assert-number')
const assertExists = require('./validation/assert-exists')

class OffenderManager {
  constructor (id, key, forename, surname, typeId, gradeCode) {
    this.id = id
    this.key = key
    this.forename = forename
    this.surname = surname
    this.typeId = typeId
    this.gradeCode = gradeCode
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertExists(this.key, 'key')
  }
}

module.exports = OffenderManager
