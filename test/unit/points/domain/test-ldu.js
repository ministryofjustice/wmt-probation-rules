/* eslint-disable no-new */

const expect = require('chai').expect
const moment = require('moment')
const Ldu = require('../../../../app/points/domain/ldu')

describe('services/domain/ldu', function () {
  var id = 1231
  var code = '420A1F'
  var description = 'test description'
  var effectiveFrom = moment([2012, 4, 22])
  var effectiveTo = moment([2015, 4, 22])

  it('should construct a ldu domain object', function (done) {

    var ldu = new Ldu(id, code, description, effectiveFrom, effectiveTo)

    expect(ldu.id).to.equal(id)
    expect(ldu.code).to.equal(code)
    expect(ldu.description).to.equal(description)
    expect(ldu.effectiveFrom).to.equal(effectiveFrom)
    expect(ldu.effectiveTo).to.equal(effectiveTo)
    done()
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new Ldu(undefined, code) }).to.throw(Error)
    expect(function () { new Ldu(id, undefined) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new Ldu('String', lduId) }).to.throw(Error)
  })

  it('throws an error when any effective date is any object other than an instance of moment', function () {
    expect(function () { new Ldu(id, code, description, {}, effectiveTo ) }).to.throw(Error)
    expect(function () { new Ldu(id, code, description, effectiveFrom, {}) }).to.throw(Error)
    expect(function () { new Ldu(id, code, description, new Date(2012,4,22), effectiveTo ) }).to.throw(Error)
    expect(function () { new Ldu(id, code, description, effectiveFrom, new Date(2015,4,22)) }).to.throw(Error)
    expect(function () { new Ldu(id, code, description, 'String', effectiveTo ) }).to.throw(Error)
    expect(function () { new Ldu(id, code, description, effectiveFrom, 'String') }).to.throw(Error)
  })
})
