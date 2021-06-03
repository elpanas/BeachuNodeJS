const mongoose = require('mongoose');

// schema della collezione (o tabella)
const bathSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    city: String,
    province: String,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'] // 'location.type' must be 'Point'            
        },
        coordinates: [Number]
    },
    tot_umbrellas: {
        type: Number, default: 0
    },
    av_umbrellas: {
        type: Number, default: 0
    },
    uid: {
        type: String, required: true
    },
    phone: String,
    email: String,
    web: String
}).index({ name: 1, city: 1, province: 1 }, { unique: true });

// creazione della collezione sulla base dello schema
const Bath = mongoose.model('stabilimenti', bathSchema);

exports.Bath = Bath;