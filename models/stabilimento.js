const mongoose = require('mongoose');

// schema della collezione (o tabella)
const stabSchema = new mongoose.Schema({
    nome: {
        type: String, required: true
    },
    localita: String,
    provincia: String,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'] // 'location.type' must be 'Point'            
        },
        coordinates: [Number]
    },
    ombrelloni: {
        type: Number, default: 0
    },
    disponibili: {
        type: Number, default: 0
    },
    idutente: {
        type: String, required: true
    },
    telefono: String,
    email: String,
    web: String
});
    //.index({ nome: 1, localita: 1, provincia: 1 }, { unique: true });

// creazione della collezione sulla base dello schema
const Stabilimento = mongoose.model('stabilimenti', stabSchema);

exports.Stabilimento = Stabilimento;
