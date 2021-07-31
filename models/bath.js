const mongoose = require('mongoose'),
  stringOpts = {
    type: String,
    required: true,
  },
  numberOpts = {
    type: Number,
    default: 0,
  },
  bathSchema = new mongoose.Schema({
    name: stringOpts,
    city: String,
    province: String,
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: [Number],
    },
    tot_umbrellas: numberOpts,
    av_umbrellas: numberOpts,
    uid: stringOpts,
    phone: String,
  }).index(
    { name: 1, city: 1, province: 1 },
    { location: '2dsphere' },
    { unique: true }
  ),
  Bath = mongoose.model('stabilimenti', bathSchema);

module.exports.Bath = Bath;
