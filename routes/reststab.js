const express = require('express');
const { createStab,
        getStabDispLoc,
        getStabDispCoord,
        getStabGest,
        removeStab,
        updateStab,
    updateUmbrellas } = require('../middleware/stabware');
const { checkUtente } = require('../middleware/utenteware');
const router = express.Router();

// READ
// stabilimenti disponibili
router.get('/disp/location/:loc/:prov/', (req, res) => {
    getStabDispLoc(req.params.loc, req.params.prov)
        .then((result) => {
            if (result.length > 0)
                res.json(result);
            else
                res.status(404).send('Bathing establishments were not found');
        })
        .catch(() => { res.status(404).send('Bathing establishments were not found') })
});

// stabilimenti disponibili per coordinate
router.get('/disp/coord/:long/:lat', (req, res) => {
    getStabDispCoord(req.params.long, req.params.lat)
        .then((result) => {
            if (result.length > 0)
                res.json(result);
            else
                res.status(404).send('Bathing establishments were not found');
        })
        .catch(() => { res.status(404).send('Bathing establishments were not found') })
});

// stabilimenti di un gestore
router.get('/gest', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                getStabGest(req.get('Authorization'))
                    .then((result) => {
                        if (result)
                            res.send(result);
                        else
                            res.status(404).send('Bathing establishments were not found');
                    })
                    .catch(() => { res.status(400).send() });
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send() })
});

// stabilimento singolo
router.get('/:id', (req, res) => {
    getStab(req.params.id)
        .then((result) => {
            if (result.length > 0)
                res.json(result);
            else
                res.status(404).send('Bathing establishment was not found');
        })
        .catch(() => { res.status(404).send('Bathing establishment was not found') });
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di uno stabilimento
router.post('/', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                createStab(req.body)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(400).send() })
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send() })
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna il numero di ombrelloni disponibili
router.put('/disp', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                updateUmbrellas(req.body.ids, req.body.ombrelloni)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(404).send('The establishement with the given id was not found') })
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch (() => {res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send()})       
});

// aggiorna i dati dello stabilimento
router.put('/:id', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                updateStab(req.params.id, req.body)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(404).send('The establishement with the given id was not found') })
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send() })
});
// --------------------------------------------------------------------

// DELETE
// elimina il record con questo id
router.delete('/:id', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                removeStab(req.params.id)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(404).send('The establishment with the given id was not found') })
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send() })
});
// --------------------------------------------------------------------

module.exports = router;
