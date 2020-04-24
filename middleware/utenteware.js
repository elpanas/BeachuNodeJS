const Joi = require('@hapi/joi');
const { Utente } = require('../models/utente');

// INSERISCE UTENTE
async function createUtente(dati_utente) {

    // creazione dell'oggetto (o record) della collezione
    const utente = new Utente({
        nome: dati_utente.nome,
        cognome: dati_utente.cognome,
        username: dati_utente.username,
        password: dati_utente.password 
    })

    // salvataggio nel db
    return result = await utente.save();
}

// RECUPERA UTENTE SINGOLO
async function getUtente(id) {

    const utenti = await Utente
        .find({ _id: id }) // criteri di ricerca   

    return utenti;
}

// LOGIN UTENTE
async function getLogin(auth) {

    var tmp = auth.split(' ');   // Divido in base allo stazio  "Basic Y2hhcmxlczoxMjM0NQ==" per recuperare la 2a parte
    var buf = new Buffer(tmp[1], 'base64'); // creo un buffer e lo avviso che l'input è in base64
    var plain_auth = buf.toString();        // converto l'input in stringa 

    // At this point plain_auth = "username:password"

    var creds = plain_auth.split(':');      // divido in base a ':' come fatto nell'app in Xamarin
    var username = creds[0];    
    var password = creds[1];

    const utenti = await Utente
        .find({
            username: username,
            password: password
        }) // criteri di ricerca   

    return utenti;
}

// RIMUOVE UNO STABILIMENTO
async function removeUtente(id) {
    return result = await home.Utente.deleteOne({ _id: id }); // elimina il record con questo id
}

// AGGIORNA INFO STABILIMENTO
async function updateUtente(idu, dati_utente) {

    const utente = await Utente.update({ _id: idu }, {
        $set: {
            nome: dati_utente.nome,
            cognome: dati_utente.cognome,
            username: dati_utente.username,
            password: dati_utente.password
        }
    }, { new: true });

    return utente;
}

// VALIDAZIONE DI POST
function validateUtente(utente) {
    // Se esiste valida l'input
    const schema = Joi.object({
        nome: Joi.string.required(),
        cognome: Joi.string.required(),
        username: Joi.string.required(),
        password: Joi.string.required()    
    });

    return schema.validate(utente);
}

module.exports.createUtente = createUtente;
module.exports.getUtente = getUtente;
module.exports.getLogin = getLogin;
module.exports.removeUtente = removeUtente;
module.exports.updateUtente = updateUtente;
module.exports.validateUtente = validateUtente;
