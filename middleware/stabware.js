const { Stabilimento } = require('../models/stabilimento');

// INSERISCE STABILIMENTO
async function createStab(dati_stab) {

    // creazione dell'oggetto (o record) della collezione
    const stab = new Stabilimento({
        nome: dati_stab.nome,
        localita: dati_stab.localita,
        provincia: dati_stab.provincia,
        location: {
            type: "Point",
            coordinates: [dati_stab.longitudine, dati_stab.latitudine]
        },
        ombrelloni: dati_stab.ombrelloni,
        disponibili: dati_stab.ombrelloni,
        idutente: dati_stab.idu,
        telefono: dati_stab.telefono,
        email: dati_stab.mail,
        web: dati_stab.web
    });

    return await stab.save();
}

// RECUPERA STABILIMENTO SINGOLO
async function getStab(id) {
    return await Stabilimento.findById(id) // criteri di ricerca   
}

// CERCA STABILIMENTI DISPONIBILI PER LUOGO
async function getStabDispLoc(loc, prov) {

    return await Stabilimento
        .find({
            disponibili: { $gt: 0 }, // i disponibili devono essere maggiori di 0
            localita: loc,
            provincia: prov
        }) // criteri di ricerca          
        .sort({ disponibili: 1, nome: 1 }) // ordine asc 
        .limit(20);
}

// CERCA STABILIMENTI DISPONIBILI PER COORDINATE
async function getStabDispCoord(long, lat) {

    return await Stabilimento
        .find({
            disponibili: { $gt: 0 }, // i disponibili devono essere maggiori di 0              
            $geoNear: {
                near: { type: "Point", coordinates: [long, lat] },
                maxDistance: 3000 // in metri
            }
        }) // criteri di ricerca 
        .sort({ disponibili: 1, nome: 1 }) // ordine asc 
        .limit(20);
}

// CERCA STABILIMENTI DI UN GESTORE
async function getStabGest(auth) {

    const tmp = auth.split(' ');   // Divido in base allo stazio  "Basic Y2hhcmxlczoxMjM0NQ==" per recuperare la 2a parte
    const idu = Buffer.from(tmp[1], 'base64').toString(); // creo un buffer e lo avviso che l'input è in base64  

    return await Stabilimento
        .find({ idutente: idu }) // criteri di ricerca          
        .sort({ nome: 1 }) // ordine asc
}

// RIMUOVE UNO STABILIMENTO
async function removeStab(id) {
    return await home.Stabilimento.deleteOne({ _id: id }); // elimina il record con questo id
}

// AGGIORNA INFO STABILIMENTO
async function updateStab(ids, dati_stab) {

    return await Stabilimento.update({ _id: ids }, {
        $set: {
            nome: dati_stab.nome,
            localita: dati_stab.localita,
            provincia: dati_stab.provincia,
            location: {
                type: "Point",
                coordinates: [dati_stab.longitudine, dati_stab.latitudine]
            },
            idu: dati_stab.idu,
            ombrelloni: dati_stab.ombrelloni,
            disponibili: dati_stab.disponibili,
            telefono: dati_stab.telefono,
            email: dati_stab.email,
            web: dati_stab.web
        }
    }, { new: true });
}

// AGGIORNA IL NUMERO DI OMBRELLONI
async function updateUmbrellas(ids, disp) {

    return await Stabilimento.findByIdAndUpdate({ _id: ids }, {
        $set: {
            disponibili: disp
        }
    }, { new: true });
}

module.exports.createStab = createStab;
module.exports.getStab = getStab;
module.exports.getStabDispLoc = getStabDispLoc;
module.exports.getStabDispCoord = getStabDispCoord;
module.exports.getStabGest = getStabGest;
module.exports.removeStab = removeStab;
module.exports.updateStab = updateStab;
module.exports.updateUmbrellas = updateUmbrellas;