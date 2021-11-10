const loadtest = require('loadtest');
const { app: auth } = require('../../config/config');
const lat = 41.4566583,
  long = 15.5343864;
function statusCallback(error, result, latency) {
  console.log(
    'Current latency %j, result %j, error %j',
    latency,
    result,
    error
  );
  console.log('----');
  console.log('Request elapsed milliseconds: ', result.requestElapsed);
  console.log('Request index: ', result.requestIndex);
  console.log('Request loadtest() instance index: ', result.instanceIndex);
}
const optionsGet = {
  url: `http://localhost:3000/api/bath/bath/1`,
  headers: {
    Authorization: auth,
  },
  maxRequests: 1000,
};

loadtest.loadTest(optionsGet, function (error, result) {
  if (error) {
    return console.error('Got an error: %s', error);
  }
  console.log(`Total requests: ${result.totalRequests}`);
  console.log(`Total Time: ${result.totalTimeSeconds}`);
});
