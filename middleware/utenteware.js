const { Utente } = require('../models/utente');

// INSERISCE UTENTE
async function createUtente(dati_utente) {

    // controlla che il documento non esista già
    const userExists = await Utente.exists({
        nome: dati_utente.nome,
        cognome: dati_utente.cognome,
        username: dati_utente.username
    });

    if (!userExists) {
        // creazione dell'oggetto (o record) della collezione
        const utente = new Utente({
            nome: dati_utente.nome,
            cognome: dati_utente.cognome,
            username: dati_utente.username,
            password: dati_utente.password
        });

        // salva il documento
        return await utente.save();
    }    
    
    return false;
}

// RECUPERA UTENTE SINGOLO
async function getUtente(id) {  
    return await Utente.findById(id);
}

// LOGIN UTENTE
async function getLogin(auth) {

    const tmp = auth.split(' ');   // Divido in base allo stazio  "Basic Y2hhcmxlczoxMjM0NQ==" per recuperare la 2a parte
    const buf = Buffer.from(tmp[1], 'base64').toString(); // creo un buffer e lo avviso che l'input è in base64

    // At this point buf = "username:password"
    const [username, password] = buf.split(':');      // divido in base a ':' come fatto nell'app in Xamarin

    const userExist = await Utente.exists({
        username: username,
        password: password
    }) // criteri di ricerca 

    if (userExist) {
        return await Utente.findOne({            
            username: username,
            password: password
        }) // criteri di ricerca           
    }

    return false;
}

// RIMUOVE UN UTENTE
async function removeUtente(id) {
    return result = await Utente.deleteOne({ _id: id }); // elimina il record con questo id
}

// AGGIORNA INFO UTENTE
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

module.exports.createUtente = createUtente;
module.exports.getUtente = getUtente;
module.exports.getLogin = getLogin;
module.exports.removeUtente = removeUtente;
module.exports.updateUtente = updateUtente;
