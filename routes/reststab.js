const express = require('express'),
    { createBath,
        getBathDispLoc,
        getBathDispCoord,
        getBathGest,
        removeBath,
        updateBath,
    updateUmbrellas } = require('../middleware/bathware'),
    { authManagement } = require('../functions/functions'),
    errorMessage = 'The establishment with the given id was not found';
const router = express.Router();

// READ
// Stabilimenti disponibili
router.get('/disp/location/:loc/:prov', async (req, res) => {
    var result = await getBathDispLoc(req.params.loc, req.params.prov);        
    resultManagement(res, result);
});

// Stabilimenti disponibili per coordinate
router.get('/disp/coord/:long/:lat', async (req, res) => {
    var result = await getBathDispCoord(req.params.long, req.params.lat);        
    resultManagement(res, result);
});        

// Stabilimenti di un gestore
router.get('/gest', async (req, res) => {    
    var result = await getBathGest(req.get('Authorization'));
    resultManagement(res, result);
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di uno Bathilimento
router.post('/', (req, res) => {
    authManagement(req, res); 
    createBath(req.body)
        .then(() => res.status(200).send())
        .catch(() => res.status(400).send());          
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna il numero di ombrelloni disponibili
router.put('/disp', (req, res) => {
    authManagement(req, res); 
    updateUmbrellas(req.body.bid, req.body.avumbrellas)
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send(errorMessage)); 
});

// aggiorna i dati dello Bathilimento
router.put('/:id', (req, res) => {
    authManagement(req, res);
    updateBath(req.params.id, req.body)
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send(errorMessage));            
});
// --------------------------------------------------------------------

// DELETE
// elimina il record con questo id
router.delete('/:id', (req, res) => {
    authManagement(req, res);
    removeBath(req.params.id)
        .then(() => res.status(200).send())
        .catch(() => res.status(404).send(errorMessage));            
});
// --------------------------------------------------------------------

module.exports = router;
