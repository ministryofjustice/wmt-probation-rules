class CaseSummary {
  constructor (
    trust,
    regionDesc,
    regionCode,
    lduDesc,
    lduCode,
    teamDesc,
    teamCode,
    omSurname,
    omForename,
    omGradeCode,
    omKey,
    communityTiers,
    licenseTiers,
    custodyTiers,
    comIn1st16Weeks,
    licIn1st16Weeks
  ) {
    this.trust = trust
    this.regionDesc = regionDesc
    this.regionCode = regionCode
    this.lduDesc = lduDesc
    this.lduCode = lduCode
    this.teamDesc = teamDesc
    this.teamCode = teamCode
    this.omSurname = omSurname
    this.omForename = omForename
    this.omGradeCode = omGradeCode
    this.omKey = omKey
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.custodyTiers = custodyTiers
    this.comIn1st16Weeks = comIn1st16Weeks
    this.licIn1st16Weeks = licIn1st16Weeks
  }
}

module.exports = CaseSummary
