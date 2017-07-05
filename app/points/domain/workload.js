const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const Tiers = require('./tiers.js')

class Workload {
  constructor (workloadOwnerId, totalCases, monthlySdrs,
          sdrsDueNext30Days, sdrConversionsLast30Days,
          paromsCompletedLast30Days, paromsDueNext30Days, custodyTiers,
          communityTiers, licenseTiers, licenseCasesLast16Weeks,
          communityCasesLast16Weeks) {
    this.workloadOwnerId = workloadOwnerId
    this.totalCases = totalCases
    this.monthlySdrs = monthlySdrs
    this.sdrsDueNext30Days = sdrsDueNext30Days
    this.sdrConversionsLast30Days = sdrConversionsLast30Days
    this.paromsCompletedLast30Days = paromsCompletedLast30Days
    this.paromsDueNext30Days = paromsDueNext30Days
    this.custodyTiers = custodyTiers
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.licenseCasesLast16Weeks = licenseCasesLast16Weeks
    this.communityCasesLast16Weeks = communityCasesLast16Weeks
    this.isValid()
  }

  isValid () {
    assertNumber(this.workloadOwnerId, 'Workload Owner Id')
    assertNumber(this.totalCases, 'Total Cases')
    assertNumber(this.monthlySdrs, 'Monthly SDRs')
    assertNumber(this.sdrsDueNext30Days, 'SDRs Due Next 30 Days')
    assertNumber(this.sdrConversionsLast30Days, 'SDR Conversions Last 30 Days')
    assertNumber(this.paromsCompletedLast30Days, 'PAROMS Completed Last 30 Days')
    assertNumber(this.paromsDueNext30Days, 'PAROMS Due Next 30 Days')
    assertObjectType(this.custodyTiers, Tiers, 'Custody Tiers')
    assertObjectType(this.communityTiers, Tiers, 'Community Tiers')
    assertObjectType(this.licenseTiers, Tiers, 'License Tiers')
    assertNumber(this.licenseCasesLast16Weeks, 'License Cases Last 16 Weeks')
    assertNumber(this.communityCasesLast16Weeks, 'Community Cases Last 16 Weeks')
  }
}

module.exports = Workload
