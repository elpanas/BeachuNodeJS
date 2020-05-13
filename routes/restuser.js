const express = require('express');
const { createUtente,
    getUtente,
    getLogin,
    removeUtente,
    updateUtente,
    checkUtente } = require('../middleware/utenteware');
const router = express.Router();

// READ
//utente singolo
router.get('/gest/:id', (req, res) => {
    getUtente(req.params.id)
        .then((result) => {
            if (result.length > 0)
                res.status(200).json(result);
            else
                res.status(404).send('User was not found');
        })
        .catch(() => { res.status(404).send('User was not found') })
});

// login
router.get('/login', (req, res) => {
    getLogin(req.get('Authorization'))
        .then((result) => {
            if (!result)
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
            else
                res.status(200).json("id", result);
        })
        .catch(() => { res.status(404).send('Error') })
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di un utente
router.post('/', (req, res) => {
    createUtente(req.body)
        .then((result) => { 
            if (result) 
                res.status(200).send(Buffer.from(result._id).toString('base64'));
            else
                res.status(400).send(); })
        .catch(() => { res.status(400).send() })
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna i dati di un utente
router.put('/:id', (req, res) => {
    checkUtente(req.get('Authorization'))
        .then((result) => {
            if (result) {
                updateUtente(req.params.id, req.body)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(404).send('The user with the given id was not found') })
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
                removeUtente(req.params.id)
                    .then(() => { res.status(200).send() })
                    .catch(() => { res.status(404).send('The user with the given id was not found') })
            }
            else
                res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate', 'Basic realm: "Area Riservata"').send() });
});
// --------------------------------------------------------------------

module.exports = router;
