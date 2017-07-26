const expect = require('chai').expect
const filterOmGradeCode = require('../../../app/context-map/om-grade-code')

describe('context-map/om-grade-code', () => {
  describe('valid codes', () => {
    it('returns the correct grade code when an nDelius code is passed in', () => {
      expect(filterOmGradeCode('NPSD')).to.equal('PO')
      expect(filterOmGradeCode('CRCC')).to.equal('SPO')
      expect(filterOmGradeCode('CRCK')).to.equal('TPO')
      expect(filterOmGradeCode('NPSY')).to.equal('PSO')
    })
  })
  describe('invalid codes', () => {
    it('return an empty string', () => {
      expect(filterOmGradeCode('ABCD')).to.equal('')
      expect(filterOmGradeCode('')).to.equal('')
      expect(filterOmGradeCode('1234*')).to.equal('')
    })
  })
})
