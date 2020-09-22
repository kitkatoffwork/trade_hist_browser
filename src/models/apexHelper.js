export const toCandlesSource = function (dfRows) {
  return dfRows.map(function(row) {
    return { x: row.time, y: [row.open, row.high, row.low, row.close] }
  });
}

export const toEntriesSource = function (dfRows) {
  return dfRows.map(function(row) { return { x: row.time, y: row.entry }; });
}


/* --------------------------------------
      calculate min, max of array
-------------------------------------- */
export const minimize = function (hashArray) {
  const keyOfMin = 'low';
  const minCandidates = hashArray.map(function(row) { return row[keyOfMin] })

  return min(minCandidates);
}

const min = function (array) { return array.reduce(aryMin); }
const aryMin = function (a, b) { return Math.min(a, b); }

