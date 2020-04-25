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

router.get('/login', (req, res) => {
    getLogin(req.headers["www-authenticate"])
        .then(result => {
            if (result.length > 0)
                res.status(200).send(result);
            else
                res.status(403).send('Forbidden');
        })
        .catch(() => { res.status(404).send('User was not found') })
});
// --------------------------------------------------------------------

// CREATE
// inserisce i dati di un utente
router.post('/', (req, res) => {
    /* const { error } = validateUtente(req.body);
    if (error) return res.status(400).send(error.details[0].message); */
    createUtente(req.body)
        .then(() => { res.status(200).send() })
        .catch(() => { res.status(400).send("Error") })
});
// --------------------------------------------------------------------

// UPDATE
// aggiorna i dati di un utente
router.put('/:id', (req, res) => {
    /* const { error } = validateUtente(req.body);
    if (error) return res.status(400).send(error.details[0].message); */
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
