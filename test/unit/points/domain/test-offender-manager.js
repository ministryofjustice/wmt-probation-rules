 /* eslint-disable no-new */

const expect = require('chai').expect
const OffenderManager = require('../../../../app/points/domain/offender-manager')

describe('services/domain/offender-manager', function () {
  var id = 1231
  var key = 2311
  var forename = 'Tony'
  var surname = 'Tester'
  var typeId = 'U'
  var gradeCode = 'L'

  it('should construct an offender manager domain object', function () {
    var offenderManager = new OffenderManager(id, key, forename, surname, typeId, gradeCode)

    expect(offenderManager.id).to.equal(id)
    expect(offenderManager.key).to.equal(key)
    expect(offenderManager.forename).to.equal(forename)
    expect(offenderManager.surname).to.equal(surname)
    expect(offenderManager.typeId).to.equal(typeId)
    expect(offenderManager.gradeCode).to.equal(gradeCode)
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new OffenderManager(id, undefined, forename, surname, typeId, gradeCode) }).to.throw(Error)
    expect(function () { new OffenderManager(id, key, forename, surname, undefined, gradeCode) }).to.throw(Error)
  })
})
