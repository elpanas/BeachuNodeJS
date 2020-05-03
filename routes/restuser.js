const express = require('express');
const { createUtente,
        getUtente,
        removeUtente,
        updateUtente } = require('../middleware/utenteware');
const router = express.Router();

// READ
// utente singolo
router.get('/:id', (req, res) => {
    getUtente(req.params.id)
        .then(result => {
            if (result.length > 0)
                res.send(result);
            else
                res.status(404).send('User was not found');
        })
        .catch(() => { res.status(404).send('User was not found') })
});

// login
router.get('/login', (req, res) => {
    getLogin(req.headers.authorization)
        .then((result) => {
            if (result)
                res.status(200).send(result);
            else
                res.status(401).setHeader('WWW-Authenticate','Basic: "Area Riservata"').send();
        })
        .catch(() => { res.status(401).setHeader('WWW-Authenticate','Basic: "Area Riservata"').send('Forbidden'); })
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di un utente
router.post('/', (req, res) => {
    createUtente(req.body)
        .then((result) => { if (result) res.status(200).send(); else res.status(400).send(); })
        .catch(() => { res.status(400).send() })
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna i dati di un utente
router.put('/:id', (req, res) => {    
    updateUtente(req.params.id, req.body)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(404).send('The user with the given id was not found') })
});
// --------------------------------------------------------------------

// DELETE
// elimina il record con questo id
router.delete('/:id', (req, res) => {
    removeUtente(req.params.id)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(404).send('The user with the given id was not found') })
});
// --------------------------------------------------------------------

module.exports = router;
