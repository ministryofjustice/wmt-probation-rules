
module.exports = function (omGradeCode) {
  let newGradeCode = ''
  const poList = [
    'D', 'CRCD', 'NPSD', 'E', 'CRCE', 'NPSE', 'F', 'CRCF',
    'NPSF', 'G', 'CRCG', 'NPSG', 'H', 'CRCH', 'NPSH', 'J', 'CRCJ', 'NPSJ',
    'M', 'CRCM', 'NPSM', 'N', 'CRCN', 'NPSN', 'O', 'CRCO', 'NPSO'
  ]
  const spoList = ['C', 'CRCC', 'NPSC']
  const tpoList = ['K', 'CRCK', 'NPSK', 'L', 'CRCL', 'NPSL', 'P', 'CRCP', 'NPSP', 'NPQF']
  const psoList = ['Y', 'CRCY', 'NPSY', 'Z', 'CRCZ', 'NPSZ', 'Q', 'CRCQ', 'NPSQ']

  const dmyList = [
    '-1', 'A', 'CRCA', 'NPSA', 'B', 'CRCB', 'NPSB', 'R', 'CRCR', 'NPSR', 'S',
    'CRCS', 'NPSS', 'T', 'CRCT', 'NPST', 'OG01', 'CRC1', 'NPS1', 'OG02', 'CRC2',
    'NPS2', 'OG03', 'CRC3', 'NPS3', 'OG04', 'CRC4', 'NPS4', 'OG05', 'CRC5',
    'NPS5', 'OG06', 'CRC6', 'NPS6', '', null, undefined, ' '
  ]

  if (poList.includes(omGradeCode)) {
    newGradeCode = 'PO'
  } else if (spoList.includes(omGradeCode)) {
    newGradeCode = 'SPO'
  } else if (tpoList.includes(omGradeCode)) {
    newGradeCode = 'TPO'
  } else if (psoList.includes(omGradeCode)) {
    newGradeCode = 'PSO'
  } else if (dmyList.includes(omGradeCode)) {
    newGradeCode = 'DMY'
  }
  return newGradeCode
}
