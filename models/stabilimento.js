const mongoose = require('mongoose');

// schema della collezione (o tabella)
const stabSchema = new mongoose.Schema({
    nome: {
        type: String, required: true
    },
    localita: String,
    provincia: String,
    location: {
        type: String,
        coordinates: [Number]
    },
    ombrelloni: {
        type: Number, default: 0
    },
    disponibili: {
        type: Number, default: 0
    },
    telefono: Number,
    email: String,
    web: String
});

// creazione della collezione sulla base dello schema
const Stabilimento = mongoose.model('stabilimenti', stabSchema);

exports.Stabilimento = Stabilimento;