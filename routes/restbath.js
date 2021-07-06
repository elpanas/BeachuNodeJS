const express = require('express'),
  {
    createBath,
    getBathDispLoc,
    getBathDispCoord,
    getBath,
    getBathGest,
    removeBath,
    updateBath,
    updateUmbrellas,
  } = require('../middleware/bathware'),
  { authManagement, resultManagement } = require('../functions/functions'),
  errorMessage = 'The establishment with the given id was not found',
  router = express.Router();

// CREATE
router.post('/', (req, res) => {
  authManagement(req, res);
  createBath(req.body)
    .then(() => res.status(201).send())
    .catch(() => res.status(400).send());
});
// --------------------------------------------------------------------

// READ
router.get('/disp/location/:loc/:prov', async (req, res) => {
  authManagement(req, res);
  const result = await getBathDispLoc(req.params.loc, req.params.prov);
  resultManagement(res, result);
});

router.get('/disp/coord/:lat/:long', async (req, res) => {
  authManagement(req, res);
  const result = await getBathDispCoord(req.params.lat, req.params.long);
  resultManagement(res, result);
});

router.get('/bath/:id', async (req, res) => {
  authManagement(req, res);
  const result = await getBath(req.params.id);
  resultManagement(res, result);
});

router.get('/gest/:id', async (req, res) => {
  authManagement(req, res);
  const result = await getBathGest(req.params.id);
  resultManagement(res, result);
});
// --------------------------------------------------------------------

// UPDATE UMBRELLAS
router.patch('/disp', (req, res) => {
  authManagement(req, res);
  updateUmbrellas(req.body.bid, req.body.av_umbrellas)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send(errorMessage));
});
// --------------------------------------------------------------------

// UPDATE WHOLE BATH
router.put('/:id', (req, res) => {
  authManagement(req, res);
  updateBath(req.params.bid, req.body)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send(errorMessage));
});
// --------------------------------------------------------------------

// DELETE
router.delete('/:id', (req, res) => {
  authManagement(req, res);
  removeBath(req.params.id)
    .then(() => res.status(200).send())
    .catch(() => res.status(404).send(errorMessage));
});
// --------------------------------------------------------------------

module.exports = router;
