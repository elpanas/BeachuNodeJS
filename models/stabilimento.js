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
    telefono: String,
    email: String,
    web: String
});

// creazione della collezione sulla base dello schema
const Stabilimento = mongoose.model('stabilimenti', stabSchema);

exports.Stabilimento = Stabilimento;
