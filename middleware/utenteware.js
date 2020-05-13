const { Utente } = require('../models/utente');

// INSERISCE UTENTE
async function createUtente(dati_utente) {

    const user = Buffer.from(dati_utente.username, 'base64').toString();
    const psw = Buffer.from(dati_utente.password, 'base64').toString();

    // creazione dell'oggetto (o record) della collezione
    const utente = new Utente({
        nome: dati_utente.nome,
        cognome: dati_utente.cognome,
        email: dati_utente.email,
        username: user,
        password: psw
    });

    // salva il documento
    const result = await utente.save();

    if (result._id)
        return result._id;
    else
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

    const result = await Utente.findOne({
        username: username,
        password: password
    }) // criteri di ricerca         

    if (result)
        return Buffer.from(result._id, 'base64').toString;
    else
        return false;
}

// RIMUOVE UN UTENTE
async function removeUtente(id) {
    return result = await Utente.findByIdAndDelete(id); // elimina il record con questo id
}

// AGGIORNA INFO UTENTE
async function updateUtente(idu, dati_utente) {

    const utente = await Utente.update({ _id: idu }, {
        $set: {
            nome: dati_utente.nome,
            cognome: dati_utente.cognome,
            email: dati_utente.email,
            username: dati_utente.username,
            password: dati_utente.password
        }
    }, { new: true });

    return utente;
}

async function checkUtente(auth) {

    const tmp = auth.split(' ');   // Divido in base allo stazio  "Basic Y2hhcmxlczoxMjM0NQ==" per recuperare la 2a parte
    const idu = Buffer.from(tmp[1], 'base64').toString(); // creo un buffer e lo avviso che l'input è in base64       
    
    const result = await Utente.find({ _id: idu }) // criteri di ricerca 

    if (result)
        return true;
    else
        return false;
}

module.exports.createUtente = createUtente;
module.exports.getUtente = getUtente;
module.exports.getLogin = getLogin;
module.exports.removeUtente = removeUtente;
module.exports.updateUtente = updateUtente;
module.exports.checkUtente = checkUtente;
