/* eslint-disable no-new */

const expect = require('chai').expect
const moment = require('moment')
const Team = require('../../../../app/points/domain/team')

describe('services/domain/team', function () {
  var id = 1231
  var lduId = 2311
  var teamCode = '19DS0F'
  var description = 'test description'
  var effectiveFrom = moment([2012, 4, 22])
  var effectiveTo = moment([2015, 4, 22])

  it('should construct a team domain object', function (done) {

    var team = new Team(id, lduId, teamCode, description, effectiveFrom, effectiveTo)

    expect(team.id).to.equal(id)
    expect(team.lduId).to.equal(lduId)
    expect(team.teamCode).to.equal(teamCode)
    expect(team.description).to.equal(description)
    expect(team.effectiveFrom).to.equal(effectiveFrom)
    expect(team.effectiveTo).to.equal(effectiveTo)
    done()
  })

  it('throws an error when any required property is undefined', function () {
    expect(function () { new Team(undefined, lduId, teamCode, description) }).to.throw(Error)
    expect(function () { new Team(id, undefined, teamCode, description) }).to.throw(Error)
    expect(function () { new Team(id, lduId, undefined, description) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, undefined) }).to.not.throw(Error)
    expect(function () { new Team(id, lduId, description) }).to.not.throw(Error)
  })

  it('throws an error when any numeric property is not a number', function () {
    expect(function () { new Team('String', lduId) }).to.throw(Error)
    expect(function () { new Team(1, 'String') }).to.throw(Error)
  })

  it('throws an error when any effective date is any object other than an instance of moment', function () {
    expect(function () { new Team(id, lduId, teamCode, description, {}, effectiveTo ) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, description, effectiveFrom, {}) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, description, new Date(2012,4,22), effectiveTo ) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, description, effectiveFrom, new Date(2015,4,22)) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, description, 'String', effectiveTo ) }).to.throw(Error)
    expect(function () { new Team(id, lduId, teamCode, description, effectiveFrom, 'String') }).to.throw(Error)
  })
})
