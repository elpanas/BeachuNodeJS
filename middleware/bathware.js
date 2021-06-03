const { Bath } = require('../models/bath');

// INSERISCE BathILIMENTO
async function createBath(bath_data) {
    const Bath = new Bath(bath_data);
    return await Bath.save();
}

// CERCA BathILIMENTI av_umbrellas PER LUOGO
async function getBathDispLoc(city, prov) {
    return await Bath
        .find({
            av_umbrellas: { $gt: 0 }, // i av_umbrellas devono essere maggiori di 0
            city: city,
            province: prov
        })        
        .sort({ av_umbrellas: 1, name: 1 }) // ordine asc 
        .limit(20)
        .lean();
}

// CERCA STABILIMENTI PER COORDINATE
async function getBathDispCoord(long, lat) {
    return await Bath
        .find({
            av_umbrellas: { $gt: 0 },             
            $geoNear: {
                near: { type: 'Point', coordinates: [long, lat] },
                maxDistance: 3000 // in metri
            }
        }) // criteri di ricerca 
        .sort({ av_umbrellas: 1, name: 1 })
        .limit(20)
        .lean();
}

// CERCA STABILIMENTI DI UN GESTORE
async function getBathGest(uid) {  
    return await Bath
        .find({ uid: uid })      
        .sort({ nome: 1 })
        .lean();
}

// AGGIORNA INFO BathILIMENTO
async function updateBath(bid, bath_data) {
    return await Bath
    .findByIdAndUpdate(
        bid,
        bath_data,
        { new: true }
    )
    .lean();
}

// AGGIORNA IL NUMERO DI av_umbrellas
async function updateUmbrellas(bid, available) {
    return await Bath
    .findByIdAndUpdate(
        bid,
        { av_umbrellas: available },
        { new: true }
    )
    .lean();
}

// RIMUOVE UNO STABILIMENTO
async function removeBath(bid) {
    return await Bath.findByIdAndDelete(bid).lean();
}

module.exports.createBath = createBath;
module.exports.getBathDispLoc = getBathDispLoc;
module.exports.getBathDispCoord = getBathDispCoord;
module.exports.getBathGest = getBathGest;
module.exports.updateBath = updateBath;
module.exports.updateUmbrellas = updateUmbrellas;
module.exports.removeBath = removeBath;
