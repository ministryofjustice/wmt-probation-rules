/* eslint-disable no-new */

const expect = require('chai').expect
const WorkingHours = require('../../../../app/points/domain/working-hours')

describe('services/domain/working-hours', function () {
  const id = 123
  const contractedHours = 40
  const reduction = 5
  const notes = 'test notes'

  it('should construct a working hours domain object', function () {
    const workingHours = new WorkingHours(id, contractedHours, reduction, notes)

    expect(workingHours.id).to.equal(id)
    expect(workingHours.contractedHours).to.equal(contractedHours)
    expect(workingHours.reduction).to.equal(reduction)
    expect(workingHours.notes).to.equal(notes)
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new WorkingHours(id, undefined, reduction, notes) }).to.throw(Error)
    expect(function () { new WorkingHours(id, contractedHours, undefined, notes) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new WorkingHours(id, 'String', reduction, notes) }).to.throw(Error)
    expect(function () { new WorkingHours(id, contractedHours, 'String', notes) }).to.throw(Error)
  })
})
