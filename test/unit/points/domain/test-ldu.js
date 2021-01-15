/* eslint-disable no-new */

const expect = require('chai').expect
const moment = require('moment')
const Ldu = require('../../../../app/points/domain/ldu')

describe('services/domain/ldu', function () {
  const id = 1231
  const regionId = 3423
  const code = '420A1F'
  const description = 'test description'
  const effectiveFrom = moment([2012, 4, 22])
  const effectiveTo = moment([2015, 4, 22])

  it('should construct a ldu domain object', function () {
    const ldu = new Ldu(id, regionId, code, description, effectiveFrom, effectiveTo)

    expect(ldu.id).to.equal(id)
    expect(ldu.regionId).to.equal(regionId)
    expect(ldu.code).to.equal(code)
    expect(ldu.description).to.equal(description)
    expect(ldu.effectiveFrom).to.equal(effectiveFrom)
    expect(ldu.effectiveTo).to.equal(effectiveTo)
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new Ldu(id, undefined, code, effectiveFrom, effectiveTo) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, undefined, effectiveFrom, effectiveTo) }).to.throw(Error)
  })

  it('thows an error when any property is not a number', function () {
    expect(function () { new Ldu(id, 'String', code, effectiveFrom, effectiveTo) }).to.throw(Error)
  })

  it('throws an error when any effective date is any object other than an instance of moment', function () {
    expect(function () { new Ldu(id, regionId, code, description, {}, effectiveTo) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, code, description, effectiveFrom, {}) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, code, description, new Date(2012, 4, 22), effectiveTo) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, code, description, effectiveFrom, new Date(2015, 4, 22)) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, code, description, 'String', effectiveTo) }).to.throw(Error)
    expect(function () { new Ldu(id, regionId, code, description, effectiveFrom, 'String') }).to.throw(Error)
  })
})
