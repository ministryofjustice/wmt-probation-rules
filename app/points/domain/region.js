const assertNumber = require('./validation/assert-number')
const assertExists = require('./validation/assert-exists')

class Region {
  constructor (id, code, description) {
    this.id = id
    this.code = code
    this.description = description
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertExists(this.code, 'code')
  }
}

module.exports = Region
