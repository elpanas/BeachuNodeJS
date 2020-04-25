const express = require('express');
const { createStab,
        getStabDispLoc,
        getStabDispCoord,
        getStabGest,
        removeStab,
        updateStab,
        updateUmbrellas } = require('../middleware/stabware');
const router = express.Router();

// READ
// stabilimenti disponibili
router.get('/disp/location/:loc/:prov/', (req, res) => {
    getStabDispLoc(req.params.loc, req.params.prov)
        .then(result => {
            if (result.length > 0)
                res.send(result);
            else
                res.status(404).send('Bathing establishments were not found');
        })
        .catch(() => { res.status(404).send('Bathing establishments were not found') })
});

// stabilimenti disponibili per coordinate
router.get('/disp/coord/:long/:lat', (req, res) => {
    getStabDispCoord(req.params.long, req.params.lat)
        .then(result => {
            if (result.length > 0)
                res.send(result);
            else
                res.status(404).send('Bathing establishments were not found');
        })
        .catch(() => { res.status(404).send('Bathing establishments were not found') })
});

// stabilimenti di un gestore
router.get('/gest/:id', (req, res) => {
    getStabGest(req.params.id)
        .then(result => {
            if (result.length > 0)
                res.send(result);
            else
                res.status(404).send('Bathing establishments were not found');
        })
        .catch(() => { res.status(404).send('Bathing establishments were not found') });
});

// stabilimento singolo
router.get('/:id', (req, res) => {
    getStab(req.params.id)
        .then(result => {
            if (result.length > 0)
                res.send(result);
            else
                res.status(404).send('Bathing establishment was not found');
        })
        .catch(() => { res.status(404).send('Bathing establishment was not found') });
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di uno stabilimento
router.post('/', (req, res) => {    
    createStab(req.body)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(400).send("Error") })
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna il numero di ombrelloni disponibili
router.put('/disp', (req, res) => {
    updateUmbrellas(req.body.ids, req.body.ombrelloni)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(404).send('The establishement with the given id was not found') })
});

// aggiorna i dati dello stabilimento
router.put('/:id', (req, res) => {    
    updateStab(req.params.id, req.body)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(404).send('The establishement with the given id was not found') })
});
// --------------------------------------------------------------------

// DELETE
// elimina il record con questo id
router.delete('/:id', (req, res) => {
    removeStab(req.params.id)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(404).send('The establishment with the given id was not found') })
});
// --------------------------------------------------------------------

module.exports = router;
