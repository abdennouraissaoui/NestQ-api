let DataFormatter = {}

DataFormatter.toCategoricalChart = (data) => {
  var data_points = [];
  for (let name in data) {
    data_points.push({ name: name, value: data[name] });
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
  for (let [securityName, weight] of Object.entries(holdings)) {
    entries.push({ securityName, weight })
  }
  return entries
}

DataFormatter.toDictOfHoldings = (listOfHoldings) => {
  let holdings = {}
  listOfHoldings.forEach(entry => {
    holdings[entry['securityName']] = entry['weight']
  })
  return holdings
}


DataFormatter.renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );


DataFormatter.swapKeyValue = (json) => {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

export default DataFormatter;