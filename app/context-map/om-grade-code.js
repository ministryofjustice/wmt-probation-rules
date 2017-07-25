
module.exports = function (omGradeCode) {
  var newGradeCode = ''
  var poList = [
    'D', 'CRCD', 'NPSD', 'E', 'CRCE', 'NPSE', 'F', 'CRCF',
    'NPSF', 'G', 'CRCG', 'NPSG', 'H', 'CRCH', 'NPSH', 'J', 'CRCJ', 'NPSJ',
    'M', 'CRCM', 'NPSM', 'N', 'CRCN', 'NPSN', 'O', 'CRCO', 'NPSO'
  ]
  var spoList = ['C', 'CRCC', 'NPSC']
  var tpoList = ['K', 'CRCK', 'NPSK', 'L', 'CRCL', 'NPSL', 'P', 'CRCP', 'NPSP']
  var psoList = ['Y', 'CRCY', 'NPSY', 'Z', 'CRCZ', 'NPSZ', 'Q', 'CRCQ', 'NPSQ']

  if (poList.includes(omGradeCode)) {
    newGradeCode = 'PO'
  } else if (spoList.includes(omGradeCode)) {
    newGradeCode = 'SPO'
  } else if (tpoList.includes(omGradeCode)) {
    newGradeCode = 'TPO'
  } else if (psoList.includes(omGradeCode)) {
    newGradeCode = 'PSO'
  }
  return newGradeCode
}
