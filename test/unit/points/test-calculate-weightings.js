const expect = require('chai').expect
const calculateWeighting = require('../../../app/points/calculate-weighting.js')

describe('points/calculate-weighting', function() {
    it('returns 1 - 0 for the inputs 0 - 100 at 0.01 increments', function() {
        var output = 0.99
        for (input = 1; input < 100; input++) {
            expect(calculateWeighting(input)).to.equal(output)
            output = output - 0.01
            // prevent 64 bit overflow
            output = Math.round(output * 100) / 100
        } 
    })

    it('returns 0 for input > 100', function() {
        expect(calculateWeighting(20000)).to.equal(0)
    })
    
    it('returns 1 for input < 0', function() {
        expect(calculateWeighting(-20000)).to.equal(1)
    })

    it('return NaN for text input', function() {
        expect(calculateWeighting("input")).to.be.NaN
    })
})
