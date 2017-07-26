/* eslint-disable no-new */

const expect = require('chai').expect
const WorkloadOwner = require('../../../../app/points/domain/workload-owner')

describe('services/domain/workload-owner', function () {
  var id = 123
  var offenderManagerId = 231
  var workingHoursId = 3242
  var teamId = 3223

  it('should construct a workload owner domain object', function () {
    var workloadOwner = new WorkloadOwner(id, offenderManagerId, workingHoursId, teamId)

    expect(workloadOwner.id).to.equal(id)
    expect(workloadOwner.offenderManagerId).to.equal(offenderManagerId)
    expect(workloadOwner.workingHoursId).to.equal(workingHoursId)
    expect(workloadOwner.teamId).to.equal(teamId)
  })

  it('throws an error when any property is undefined', function () {
    expect(function () { new WorkloadOwner(id, undefined, workingHoursId, teamId) }).to.throw(Error)
    expect(function () { new WorkloadOwner(id, offenderManagerId, workingHoursId, undefined) }).to.throw(Error)
    expect(function () { new WorkloadOwner(id, offenderManagerId, undefined, teamId) }).to.not.throw(Error)
  })
})