let DataFormatter = {}

DataFormatter.toPieChartFormat = (data) => {
  var data_points = [];
  for (let label in data) {
    data_points.push({ label: label, y: data[label] });
  }
  return (data_points);
}

DataFormatter.toLineChart = (data) => {
  let lines = []
  for (let asset in data) {
    let data_points = []
    for (let data_point in data[asset]) {
      data_points.push({ label: data_point, y: data[asset][data_point] })
    }
    let line = {
      type: "line",
      name: asset,
      showInLegend: true,
      dataPoints: data_points
    }
    lines.push(line)
  }
  return (lines);
}

DataFormatter.toListOfHoldings = (holdings) => {
  let entries = []
  for (let [ticker, weight] of Object.entries(holdings)) {
    entries.push({ ticker, weight })
  }
  return entries
}

DataFormatter.toDictOfHoldings = (listOfHoldings) => {
  let holdings = {}
  listOfHoldings.forEach(entry => {
    holdings[entry['ticker']] = entry['weight']
  })
  return holdings
}

export default DataFormatter;