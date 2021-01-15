/* eslint-disable no-new */

const expect = require('chai').expect
const moment = require('moment')
const Team = require('../../../../app/points/domain/team')

describe('services/domain/team', function () {
  const id = 1231
  const lduId = 2311
  const code = '19DS0F'
  const description = 'test description'
  const effectiveFrom = moment([2012, 4, 22])
  const effectiveTo = moment([2015, 4, 22])

  it('should construct a team domain object', function () {
    const team = new Team(id, lduId, code, description, effectiveFrom, effectiveTo)

    expect(team.id).to.equal(id)
    expect(team.lduId).to.equal(lduId)
    expect(team.code).to.equal(code)
    expect(team.description).to.equal(description)
    expect(team.effectiveFrom).to.equal(effectiveFrom)
    expect(team.effectiveTo).to.equal(effectiveTo)
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new Team(id, undefined, code, description) }).to.throw(Error)
    expect(function () { new Team(id, lduId, undefined, description) }).to.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new Team(id, 'String', code, description) }).to.throw(Error)
  })

  it('throws an error when any effective date is any object other than an instance of moment', function () {
    expect(function () { new Team(id, lduId, code, description, {}, effectiveTo) }).to.throw(Error)
    expect(function () { new Team(id, lduId, code, description, effectiveFrom, {}) }).to.throw(Error)
    expect(function () { new Team(id, lduId, code, description, new Date(2012, 4, 22), effectiveTo) }).to.throw(Error)
    expect(function () { new Team(id, lduId, code, description, effectiveFrom, new Date(2015, 4, 22)) }).to.throw(Error)
    expect(function () { new Team(id, lduId, code, description, 'String', effectiveTo) }).to.throw(Error)
    expect(function () { new Team(id, lduId, code, description, effectiveFrom, 'String') }).to.throw(Error)
  })
})
