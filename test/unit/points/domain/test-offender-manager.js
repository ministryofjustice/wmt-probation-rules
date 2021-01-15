/* eslint-disable no-new */

const expect = require('chai').expect
const OffenderManager = require('../../../../app/points/domain/offender-manager')

describe('services/domain/offender-manager', function () {
  const id = 1231
  const key = 2311
  const forename = 'Tony'
  const surname = 'Tester'
  const typeId = 'U'
  const gradeCode = 'L'

  it('should construct an offender manager domain object', function () {
    const offenderManager = new OffenderManager(id, key, forename, surname, typeId, gradeCode)

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
