const router = require('express').Router();

// It was designed to be blocking and CPU-intensive in order to observe
// how it would affect a cluster afterwards
router.get('/', (req, res) => {
  const base = 8;
  let result = 0;
  for (let i = Math.pow(base, 7); i >= 0; i--) {
    result += i + Math.pow(i, 10);
  }

  res.send(`Result number is ${result}`);
});

module.exports = router;
