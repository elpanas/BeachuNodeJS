const loadtest = require('loadtest');
const util = require('util');

const lat = 41.4566583;
const long = 15.5343864;

const optionsGet = {
  url: `http://localhost:3000/api/bath/disp/coord/${lat}/${long}`,
  maxRequests: 1000,
};

loadtest.loadTest(optionsGet, (error, result) => {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log(`Total requests: ${result.totalRequests}`);
  console.log(`Total Time: ${result.totalTimeSeconds}`);
  console.log(`Latency: ${util.inspect(result, false, null, true)}`);
  return 0;
});
