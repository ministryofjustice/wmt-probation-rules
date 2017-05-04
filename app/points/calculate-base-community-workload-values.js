module.exports = function (cases) {

}


// COUNT (case details)
// WHERE
// Location == ‘community’ AND
// TierCode == empty string OR TierCode == zero
// AND RowType == (O, W or U depending on postfix)

// COUNT (case details)
// WHERE
// Location == ‘community’ AND
// TierCode == [1 - 7] AND
// RowType == (O, W or U depending on postfix)

// COUNT (case details)
// WHERE
// Location == ‘community’ AND
// TierCode == 3 AND
// RowType == (O, W or U depending on postfix)
// AND DRR Exists == ‘n’

// COUNT (case details)
// WHERE
// (Location == ’community’ OR  ‘community3d’) AND
// TierCode == 3 AND
// RowType == (O, W or U depending on postfix)
// AND DRR Exists == ‘y’
