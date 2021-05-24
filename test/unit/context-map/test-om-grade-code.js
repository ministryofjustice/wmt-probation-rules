const expect = require('chai').expect
const filterOmGradeCode = require('../../../app/context-map/om-grade-code')

describe('context-map/om-grade-code', () => {
  describe('valid codes', () => {
    it('returns the correct grade code when an nDelius code is passed in', () => {
      expect(filterOmGradeCode('NPSD')).to.equal('PO')
      expect(filterOmGradeCode('CRCC')).to.equal('SPO')
      expect(filterOmGradeCode('CRCK')).to.equal('TPO')
      expect(filterOmGradeCode('NPSY')).to.equal('PSO')
      expect(filterOmGradeCode('')).to.equal('DMY')
      expect(filterOmGradeCode(null)).to.equal('DMY')
      expect(filterOmGradeCode('CPQF')).to.equal('TPO')
    })
  })
  describe('invalid codes', () => {
    it('return the DMY code as default', () => {
      expect(filterOmGradeCode('ABCD')).to.equal('DMY')
      expect(filterOmGradeCode('1234*')).to.equal('DMY')
    })
  })
})
