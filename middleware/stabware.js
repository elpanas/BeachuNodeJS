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
        idu: dati_stab.idu,
        ombrelloni: dati_stab.ombrelloni,
        disponibili: dati_stab.disponibili,
        telefono: dati_stab.telefono,
        email: dati_stab.email,
        web: dati_stab.web
    })

    // salvataggio nel db
    return result = await stab.save();
}

// RECUPERA STABILIMENTO SINGOLO
async function getStab(id) {

    const stabs = await Stabilimento
        .find({ _id: id }) // criteri di ricerca   

    return stabs;
}

// CERCA STABILIMENTI DISPONIBILI PER LUOGO
async function getStabDispLoc(loc, prov) {

    const stabs = await Stabilimento
        .find({ disponibili: { $gt: 0 } }, // i disponibili devono essere maggiori di 0
              { localita: loc, provincia: prov }) // criteri di ricerca          
        .sort({ disponibili: 1, nome: 1 }) // ordine asc 
        .limit(20);

    return stabs;
}

// CERCA STABILIMENTI DISPONIBILI PER COORDINATE
async function getStabDispCoord(long, lat) {

    const stabs = await Stabilimento
        .find({ disponibili: { $gt: 0 } }, // i disponibili devono essere maggiori di 0
              {
                  $geoNear: {
                      near: { type: "Point", coordinates: [long, lat] },
                      maxDistance: 3000 // in metri
                  }
              }) // criteri di ricerca 
        .sort({ disponibili: 1, nome: 1 }) // ordine asc 
        .limit(20);

    return stabs;
}

// CERCA STABILIMENTI DI UN GESTORE
async function getStabGest(id) {

    const stabs = await Stabilimento
        .find({ idg: id }) // criteri di ricerca          
        .sort({ nome: 1 }) // ordine asc

    return stabs;
}

// RIMUOVE UNO STABILIMENTO
async function removeStab(id) {
    return result = await home.Stabilimento.deleteOne({ _id: id }); // elimina il record con questo id
}

// AGGIORNA INFO STABILIMENTO
async function updateStab(ids, dati_stab) {

    const stab = await Stabilimento.update({ _id: ids }, {
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

    return stab;
}

// AGGIORNA IL NUMERO DI OMBRELLONI
async function updateUmbrellas(ids, disp) {

    const stab = await Stabilimento.findByIdAndUpdate({ _id: ids }, {
        $set: {
            disponibili: disp
        }
    }, { new: true });

    return stab;
}
module.exports.createStab = createStab;
module.exports.getStab = getStab;
module.exports.getStabDispLoc = getStabDispLoc;
module.exports.getStabDispCoord = getStabDispCoord;
module.exports.getStabGest = getStabGest;
module.exports.removeStab = removeStab;
module.exports.updateStab = updateStab;
module.exports.updateUmbrellas = updateUmbrellas;
