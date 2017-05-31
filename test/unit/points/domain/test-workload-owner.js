/* eslint-disable no-new */

const expect = require('chai').expect
const WorkloadOwner = require('../../../../app/points/domain/workload-owner')

describe('services/domain/workload-owner', function () {
  it('should construct a workload owner domain object', function (done) {
    var id = 123
    var offenderManagerId = 231
    var workingHoursId = 3242
    var teamId = 3223

    var workloadOwner = new WorkloadOwner(id, offenderManagerId, workingHoursId, teamId)

    expect(workloadOwner.id).to.equal(id)
    expect(workloadOwner.offenderManagerId).to.equal(offenderManagerId)
    expect(workloadOwner.workingHoursId).to.equal(workingHoursId)
    expect(workloadOwner.teamId).to.equal(teamId)
    done()
  })

  it('throws an error when any property is undefined', function () {
    expect(function () { new WorkloadOwner(undefined, 1, 1, 1) }).to.throw(Error)
    expect(function () { new WorkloadOwner(1, undefined, 1, 1) }).to.throw(Error)
    expect(function () { new WorkloadOwner(1, 1, 1, undefined) }).to.throw(Error)
  })

  it('throws an error when any property is not a number', function () {
    expect(function () { new WorkloadOwner('String', 1, 1, 1) }).to.throw(Error)
    expect(function () { new WorkloadOwner(1, 'String', 1, 1) }).to.throw(Error)
    expect(function () { new WorkloadOwner(1, 1, 1, 'String') }).to.throw(Error)
  })
})
