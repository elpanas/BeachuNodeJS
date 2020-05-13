const mongoose = require('mongoose');

// schema della collezione (o tabella)
const userSchema = new mongoose.Schema({      
    nome: {
        type: String, required: true
    },
    cognome: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    }
});

// creazione della collezione sulla base dello schema
const Utente = mongoose.model('utenti', userSchema);

exports.Utente = Utente;