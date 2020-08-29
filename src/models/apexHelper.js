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
const extractValues = function (hash) {
  return Object.keys(hash).map(function(key) { return hash[key]; });
}
// const aryMax = function (a, b) { return Math.max(a, b); }
const aryMin = function (a, b) { return Math.min(a, b); }
// let max = ary.reduce(aryMax); // => 10
const min = function (array) { return array.reduce(aryMin); }
const keyWithTarget = function (hash, target) {
  const result = Object.keys(hash).reduce(function(res, key) {
    const _keyWithTarget = hash[key] === target ? key : res;
    return _keyWithTarget
  }, null);
  return result;
}

export const minimize = function (hashArray) {
  const firstRow = hashArray[0];
  const values = extractValues(firstRow);
  const numbers = filter_numbers(values);
  const minNumber = min(numbers);
  const keyOfMin = keyWithTarget(firstRow, minNumber);
  const minCandidates = hashArray.map(function(row) { return row[keyOfMin] })

  return min(minCandidates);
}

const filter_numbers = function(values) {
  const result = values.filter(function(value) { return Object.prototype.toString.call(value) === "[object Number]"; })
  return result
}

/* ---------------------
      Sample Data
--------------------- */
export const rawData = [
  { time: new Date(1538778600000), open: 6629.81, high: 6650.5, low: 6623.04, close: 6633.33 },
  { time: new Date(1538780400000), open: 6632.01, high: 6643.59, low: 6620, close: 6630.11 },
  { time: new Date(1538782200000), open: 6630.71, high: 6648.95, low: 6623.34, close: 6635.65},
  { time: new Date(1538784000000), open: 6635.65, high: 6651, low: 6629.67, close: 6638.24 },
  { time: new Date(1538785800000), open: 6638.24, high: 6640, low: 6620, close: 6624.47 },
  { time: new Date(1538787600000), open: 6624.53, high: 6636.03, low: 6621.68, close: 6624.31 },
  { time: new Date(1538789400000), open: 6624.61, high: 6632.2, low: 6617, close: 6626.02 },
  { time: new Date(1538791200000), open: 6627, high: 6627.62, low: 6584.22, close: 6603.02 },
  { time: new Date(1538793000000), open: 6605, high: 6608.03, low: 6598.95, close: 6604.01 },
  { time: new Date(1538794800000), open: 6604.5, high: 6614.4, low: 6602.26, close: 6608.02 },
  { time: new Date(1538796600000), open: 6608.02, high: 6610.68, low: 6601.99, close: 6608.91 },
  { time: new Date(1538798400000), open: 6608.91, high: 6618.99, low: 6608.01, close: 6612 },
  { time: new Date(1538800200000), open: 6612, high: 6615.13, low: 6605.09, close: 6612 },
  { time: new Date(1538802000000), open: 6612, high: 6624.12, low: 6608.43, close: 6622.95 },
  { time: new Date(1538803800000), open: 6623.91, high: 6623.91, low: 6615, close: 6615.67 },
  { time: new Date(1538805600000), open: 6618.69, high: 6618.74, low: 6610, close: 6610.4 },
  { time: new Date(1538807400000), open: 6611, high: 6622.78, low: 6610.4, close: 6614.9 },
  { time: new Date(1538809200000), open: 6614.9, high: 6626.2, low: 6613.33, close: 6623.45 },
  { time: new Date(1538811000000), open: 6623.48, high: 6627, low: 6618.38, close: 6620.35 },
  { time: new Date(1538812800000), open: 6619.43, high: 6620.35, low: 6610.05, close: 6615.53 },
  { time: new Date(1538814600000), open: 6615.53, high: 6617.93, low: 6610, close: 6615.19 },
  { time: new Date(1538816400000), open: 6615.19, high: 6621.6, low: 6608.2, close: 6620 },
  { time: new Date(1538818200000), open: 6619.54, high: 6625.17, low: 6614.15, close: 6620 },
  { time: new Date(1538820000000), open: 6620.33, high: 6634.15, low: 6617.24, close: 6624.61 },
  { time: new Date(1538821800000), open: 6625.95, high: 6626, low: 6611.66, close: 6617.58 },
  { time: new Date(1538823600000), open: 6619, high: 6625.97, low: 6595.27, close: 6598.86 },
  { time: new Date(1538825400000), open: 6598.86, high: 6598.88, low: 6570, close: 6587.16 },
  { time: new Date(1538827200000), open: 6588.86, high: 6600, low: 6580, close: 6593.4 },
  { time: new Date(1538829000000), open: 6593.99, high: 6598.89, low: 6585, close: 6587.81 },
  { time: new Date(1538830800000), open: 6587.81, high: 6592.73, low: 6567.14, close: 6578 },
  { time: new Date(1538832600000), open: 6578.35, high: 6581.72, low: 6567.39, close: 6579 },
  { time: new Date(1538834400000), open: 6579.38, high: 6580.92, low: 6566.77, close: 6575.96 },
  { time: new Date(1538836200000), open: 6575.96, high: 6589, low: 6571.77, close: 6588.92 },
  { time: new Date(1538838000000), open: 6588.92, high: 6594, low: 6577.55, close: 6589.22 },
  { time: new Date(1538839800000), open: 6589.3, high: 6598.89, low: 6589.1, close: 6596.08 },
  { time: new Date(1538841600000), open: 6597.5, high: 6600, low: 6588.39, close: 6596.25 },
  { time: new Date(1538843400000), open: 6598.03, high: 6600, low: 6588.73, close: 6595.97 },
  { time: new Date(1538845200000), open: 6595.97, high: 6602.01, low: 6588.17, close: 6602 },
  { time: new Date(1538847000000), open: 6602, high: 6607, low: 6596.51, close: 6599.95 },
  { time: new Date(1538848800000), open: 6600.63, high: 6601.21, low: 6590.39, close: 6591.02 },
  { time: new Date(1538850600000), open: 6591.02, high: 6603.08, low: 6591, close: 6591 },
  { time: new Date(1538852400000), open: 6591, high: 6601.32, low: 6585, close: 6592 },
  { time: new Date(1538854200000), open: 6593.13, high: 6596.01, low: 6590, close: 6593.34 },
  { time: new Date(1538856000000), open: 6593.34, high: 6604.76, low: 6582.63, close: 6593.86 },
  { time: new Date(1538857800000), open: 6593.86, high: 6604.28, low: 6586.57, close: 6600.01 },
  { time: new Date(1538859600000), open: 6601.81, high: 6603.21, low: 6592.78, close: 6596.25 },
  { time: new Date(1538861400000), open: 6596.25, high: 6604.2, low: 6590, close: 6602.99 },
  { time: new Date(1538863200000), open: 6602.99, high: 6606, low: 6584.99, close: 6587.81 },
  { time: new Date(1538865000000), open: 6587.81, high: 6595, low: 6583.27, close: 6591.96 },
  { time: new Date(1538866800000), open: 6591.97, high: 6596.07, low: 6585, close: 6588.39 },
  { time: new Date(1538868600000), open: 6587.6, high: 6598.21, low: 6587.6, close: 6594.27 },
  { time: new Date(1538870400000), open: 6596.44, high: 6601, low: 6590, close: 6596.55 },
  { time: new Date(1538872200000), open: 6598.91, high: 6605, low: 6596.61, close: 6600.02 },
  { time: new Date(1538874000000), open: 6600.55, high: 6605, low: 6589.14, close: 6593.01 },
  { time: new Date(1538875800000), open: 6593.15, high: 6605, low: 6592, close: 6603.06 },
  { time: new Date(1538877600000), open: 6603.07, high: 6604.5, low: 6599.09, close: 6603.89 },
  { time: new Date(1538879400000), open: 6604.44, high: 6604.44, low: 6600, close: 6603.5 },
  { time: new Date(1538881200000), open: 6603.5, high: 6603.99, low: 6597.5, close: 6603.86 },
  { time: new Date(1538883000000), open: 6603.85, high: 6605, low: 6600, close: 6604.07 },
  { time: new Date(1538884800000), open: 6604.98, high: 6606, low: 6604.07, close: 6606 },
]

export const dots = [
  { time: new Date(1538841600000), entry: 6397.5, exit: 6700 },
  { time: new Date(1538843400000), entry: 6398.03, exit: 6700 },
  { time: new Date(1538877600000), entry: 6403.07, exit: 6704.5 },
  { time: new Date(1538879400000), entry: 6504.44, exit: 6704.44 },
  { time: new Date(1538881200000), entry: 6403.5, exit: 6703.99 },
]
