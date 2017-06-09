const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const Tiers = require('./tiers.js')

class Workload {
  constructor (workloadOwnerId, totalCases, totalCasesInactive,
          monthlySdrs, sdrsDueNext30Days, activeWarrants,
          overdueTerminations, unpaidWork, paromsCompletedLast30Days,
          paromsDueNext30Days, license16WeekCount, custodyTiers,
          communityTiers, licenseTiers) {
    this.workloadOwnerId = workloadOwnerId
    this.totalCases = totalCases
    this.totalCasesInactive = totalCasesInactive
    this.monthlySdrs = monthlySdrs
    this.sdrsDueNext30Days = sdrsDueNext30Days
    this.activeWarrants = activeWarrants
    this.overdueTerminations = overdueTerminations
    this.unpaidWork = unpaidWork
    this.paromsCompletedLast30Days = paromsCompletedLast30Days
    this.paromsDueNext30Days = paromsDueNext30Days
    this.license16WeekCount = license16WeekCount
    this.custodyTiers = custodyTiers
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.isValid()
  }

  isValid () {
    assertNumber(this.workloadOwnerId, 'Workload Owner Id')
    assertNumber(this.totalCases, 'Total Cases')
    assertNumber(this.totalCasesInactive, 'Total Cases Inactive')
    assertNumber(this.monthlySdrs, 'Monthly SDRs')
    assertNumber(this.sdrsDueNext30Days, 'SDRs Due Next 30 Days')
    assertNumber(this.activeWarrants, 'Active Warrants')
    assertNumber(this.overdueTerminations, 'Overdue Terminations')
    assertNumber(this.unpaidWork, 'Unpaid Work')
    assertNumber(this.paromsCompletedLast30Days, 'PAROMS Completed Last 30 Days')
    assertNumber(this.paromsDueNext30Days, 'PAROMS Due Next 30 Days')
    assertNumber(this.license16WeekCount, 'License 16 Week Count')
    assertObjectType(this.custodyTiers, Tiers, 'Custody Tiers')
    assertObjectType(this.communityTiers, Tiers, 'Community Tiers')
    assertObjectType(this.licenseTiers, Tiers, 'License Tiers')
  }
}

module.exports = Workload
