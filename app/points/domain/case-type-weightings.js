const assertNumber = require('./validation/assert-number')

class CaseTypeWeightings {
    constructor (warrantsWeighting, unpaidWorkWeighting, overdueWeighting) {
        this.warrantsWeighting = warrantsWeighting
        this.unpaidWorkWeighting = unpaidWorkWeighting
        this.overdueWeighting = overdueWeighting
        this.isValid()
    }

    isValid () {
        assertNumber(this.warrantsWeighting)
        assertNumber(this.unpaidWorkWeighting)
        assertNumber(this.overdueWeighting)
    }
}

module.exports = CaseTypeWeightings
