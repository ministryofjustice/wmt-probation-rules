/* eslint-disable no-new */

const expect = require('chai').expect
const WorkingHours = require('../../../../app/points/domain/working-hours')

describe('services/domain/working-hours', function () {
  it('should construct a working hours domain object', function (done) {
    var id = 123
    var contractedHours = 40
    var reduction = 5
    var notes = 'test notes'

    var workingHours = new WorkingHours(id, contractedHours, reduction, notes)

    expect(workingHours.id).to.equal(id)
    expect(workingHours.contractedHours).to.equal(contractedHours)
    expect(workingHours.reduction).to.equal(reduction)
    expect(workingHours.notes).to.equal(notes)
    done()
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new WorkingHours(undefined, 1, 1, 1) }).to.throw(Error)
    expect(function () { new WorkingHours(1, undefined, 1, 1) }).to.throw(Error)
    expect(function () { new WorkingHours(1, 1, undefined, 1) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new WorkingHours('String', 1, 1, 1) }).to.throw(Error)
    expect(function () { new WorkingHours(1, 'String', 1, 1) }).to.throw(Error)
    expect(function () { new WorkingHours(1, 1, 'String', 1) }).to.throw(Error)
  })
})
