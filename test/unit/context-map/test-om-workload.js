const expect = require('chai').expect
const mapper = require('../../../app/context-map/om-workload')

describe('app/context-map/om-workload', function () {
  describe('when an invalid source object is passed', function () {
    it('throws an error', function () {
      expect(function () { mapper({}) }).to.throw(Error)
    })
  })
})
