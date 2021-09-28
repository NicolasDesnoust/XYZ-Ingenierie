const fs = require('fs');

fs.readFile('depts.json', (err, depts) => {
  if (err) throw err;

  let result = [];

  for (const [key, value] of Object.entries(JSON.parse(depts))) {
    result.push(...value);
  }

  const unique = [...new Set(result)];

  unique.sort(function (a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  fs.writeFile('cities.json', JSON.stringify(unique), function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
});
