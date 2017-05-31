const assertNumber = require('./validation/assert-number')

class WorkloadOwner {
  constructor (id, offenderManagerId, workingHoursId, teamId) {
    this.id = id
    this.offenderManagerId = offenderManagerId
    this.workingHoursId = workingHoursId
    this.teamId = teamId
    this.isValid()
  }

  isValid () {
    assertNumber(this.id, 'id')
    assertNumber(this.offenderManagerId, 'offenderManagerId')
    assertNumber(this.teamId, 'teamId')
  }
}

module.exports = WorkloadOwner
