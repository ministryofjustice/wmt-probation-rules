class CourtReport {
  constructor (omKey, omTeamStaffGrade, sdrLast30, sdrDueNext30, sdrConvLast30) {
    this.omKey = omKey
    this.omTeamStaffGrade = omTeamStaffGrade
    this.sdrLast30 = sdrLast30
    this.sdrDueNext30 = sdrDueNext30
    this.sdrConvLast30 = sdrConvLast30
  }
}

module.exports = CourtReport
