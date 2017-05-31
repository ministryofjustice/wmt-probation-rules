 /* eslint-disable no-new */

const expect = require('chai').expect
const OffenderManager = require('../../../../app/points/domain/offender-manager')

describe('services/domain/offender-manager', function () {
  it('should construct an offender manager domain object', function (done) {
    var id = 1231
    var omKey = 2311
    var omForename = 'Tony'
    var omSurname = 'Tester'
    var omTypeId = 'U'
    var omGradeCode = 'L'

    var offenderManager = new OffenderManager(id, omKey, omForename, omSurname, omTypeId, omGradeCode)

    expect(offenderManager.id).to.equal(id)
    expect(offenderManager.omKey).to.equal(omKey)
    expect(offenderManager.omForename).to.equal(omForename)
    expect(offenderManager.omSurname).to.equal(omSurname)
    expect(offenderManager.omTypeId).to.equal(omTypeId)
    expect(offenderManager.omGradeCode).to.equal(omGradeCode)
    done()
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new OffenderManager(undefined, 1, 1, 1, 1, 1) }).to.throw(Error)
    expect(function () { new OffenderManager(1, undefined, 1, 1, 1, 1) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new OffenderManager('String', 1, 1, 1, 1, 1) }).to.throw(Error)
  })
})
