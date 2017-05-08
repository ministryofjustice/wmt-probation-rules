// PAROM === Parole Assessment Report by the Offender Manager
module.exports = function (numberOfParomCompletedInLast30Days, wpParom, paromEnabled) {
  var paromPoints = 0

  if (paromEnabled) {
    paromPoints = numberOfParomCompletedInLast30Days * wpParom
  }

  return paromPoints
}
