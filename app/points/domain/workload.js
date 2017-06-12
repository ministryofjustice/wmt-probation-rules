const assertObjectType = require('./validation/assert-object-type')
const assertNumber = require('./validation/assert-number')
const Tiers = require('./tiers.js')

class Workload {
  constructor (workloadOwnerId, totalCases, totalCustodyCases,
          totalCommunityCases, totalLicenseCases, monthlySdrs,
          sdrsDueNext30Days, paromsCompletedLast30Days,
          paromsDueNext30Days, custodyTiers,
          communityTiers, licenseTiers) {
    this.workloadOwnerId = workloadOwnerId
    this.totalCases = totalCases
    this.totalCustodyCases = totalCustodyCases
    this.totalCommunityCases = totalCommunityCases
    this.totalLicenseCases = totalLicenseCases
    this.monthlySdrs = monthlySdrs
    this.sdrsDueNext30Days = sdrsDueNext30Days
    this.paromsCompletedLast30Days = paromsCompletedLast30Days
    this.paromsDueNext30Days = paromsDueNext30Days
    this.custodyTiers = custodyTiers
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.isValid()
  }

  isValid () {
    assertNumber(this.workloadOwnerId, 'Workload Owner Id')
    assertNumber(this.totalCases, 'Total Cases')
    assertNumber(this.totalCustodyCases, 'Total Custody Cases')
    assertNumber(this.totalCommunityCases, 'Total Community Cases')
    assertNumber(this.totalLicenseCases, 'Total License Cases')
    assertNumber(this.monthlySdrs, 'Monthly SDRs')
    assertNumber(this.sdrsDueNext30Days, 'SDRs Due Next 30 Days')
    assertNumber(this.paromsCompletedLast30Days, 'PAROMS Completed Last 30 Days')
    assertNumber(this.paromsDueNext30Days, 'PAROMS Due Next 30 Days')
    assertObjectType(this.custodyTiers, Tiers, 'Custody Tiers')
    assertObjectType(this.communityTiers, Tiers, 'Community Tiers')
    assertObjectType(this.licenseTiers, Tiers, 'License Tiers')
  }
}

module.exports = Workload
