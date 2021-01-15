/* eslint-disable no-new */

const expect = require('chai').expect
const WorkloadOwner = require('../../../../app/points/domain/workload-owner')

describe('services/domain/workload-owner', function () {
  const id = 123
  const offenderManagerId = 231
  const workingHoursId = 3242
  const teamId = 3223
  const contractedHours = 37

  it('should construct a workload owner domain object', function () {
    const workloadOwner = new WorkloadOwner(id, offenderManagerId, workingHoursId, teamId, contractedHours)

    expect(workloadOwner.id).to.equal(id)
    expect(workloadOwner.offenderManagerId).to.equal(offenderManagerId)
    expect(workloadOwner.workingHoursId).to.equal(workingHoursId)
    expect(workloadOwner.teamId).to.equal(teamId)
    expect(workloadOwner.contractedHours).to.equal(contractedHours)
  })

  it('throws an error when any property is undefined', function () {
    expect(function () { new WorkloadOwner(id, undefined, workingHoursId, teamId) }).to.throw(Error)
    expect(function () { new WorkloadOwner(id, offenderManagerId, workingHoursId, undefined) }).to.throw(Error)
    expect(function () { new WorkloadOwner(id, offenderManagerId, undefined, teamId) }).to.not.throw(Error)
  })
})
