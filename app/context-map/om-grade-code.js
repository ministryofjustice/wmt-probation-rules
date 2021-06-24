module.exports = function (omGradeCode) {
  let newGradeCode = 'DMY'
  const poList = [
    'M', 'E', 'D', 'O', 'J', 'H', 'N', 'G', 'F', 'CRCM',
    'CRCO', 'CRCN', 'NPSM', 'NPSO', 'NPSN', 'PSM', 'PSO',
    'PSN'
  ]
  const spoList = ['C', 'CRCC', 'NPSC', 'PSC']
  const tpoList = ['P', 'L', 'K', 'CRCP', 'NPSP', 'PSP']
  const psoList = ['Q', 'Z', 'Y', 'CRCQ', 'NPSQ', 'PSQ']

  const dmyList = [
    'B', 'OG06', 'R', 'A', 'OG08', 'OG07', 'CPQF', 'OG02',
    'OG05', 'NPQF', 'OG01', 'S', 'T', 'OG04', 'OG03', 'CRCB',
    'CRC6', 'CRCR', 'CRCA', 'CRC2', 'CRC1', 'CRC01', 'CRCS',
    'CRCT', 'CRC4', 'CRC3', 'NPSB', 'NPS6', 'NPSR', 'NPSA',
    'NPS2', 'NPS1', 'NPS01', 'NPSS', 'NPST', 'NPS4', 'NPS3',
    'PSB', 'PS6', 'PSR', 'PSA', 'PS2', 'PS1', 'PS01', 'PS4', 'PS3',
    '', null, undefined, ' '
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
