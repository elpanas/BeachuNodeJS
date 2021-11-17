const { clearCache } = require('redis_mongoose');
const { Bath } = require('../models/bath');
const {
  redis: { time },
} = require('../config/config');

const cacheOptions = { ttl: time };
const sortUmbrellaOptions = { av_umbrellas: 1, name: 1 };

// ADD A BATH
async function createBath(bathData) {
  try {
    clearCache();
    return await Bath.create(bathData);
  } catch (e) {
    return false;
  }
}

// SEARCH FOR BATHS USING COORDINATES
async function getBathDispCoord(lat, long) {
  return Bath.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [long, lat] },
        $maxDistance: 3000, // meters
      },
    },
    av_umbrellas: { $gt: 0 },
  })
    .limit(20)
    .sort(sortUmbrellaOptions)
    .lean()
    .cache(cacheOptions);
}

// GET SINGLE BATH
async function getBath(bid) {
  try {
    return await Bath.find({ _id: bid }).lean().cache(cacheOptions);
  } catch (e) {
    return false;
  }
}

// RETURN A MANAGER'S BATHS LIST
async function getBathGest(uid) {
  return Bath.find({ uid }).sort({ name: 1 }).lean().cache(cacheOptions);
}

// UPDATE BATH INFO
async function updateBath(bid, bathData) {
  try {
    clearCache();
    return await Bath.findByIdAndUpdate(bid, bathData, {
      new: true,
    }).lean();
  } catch (e) {
    return false;
  }
}

// UPDATE NUMBER OF AVAILABLE UMBRELLAS
async function updateUmbrellas(bid, available) {
  try {
    clearCache();
    return await Bath.findByIdAndUpdate(
      bid,
      { av_umbrellas: available },
      { new: true }
    ).lean();
  } catch (e) {
    return false;
  }
}

// DELETE A BATH
async function removeBath(bid) {
  try {
    clearCache();
    return await Bath.findByIdAndDelete(bid).lean();
  } catch (e) {
    return false;
  }
}

module.exports = {
  createBath,
  getBathDispCoord,
  getBath,
  getBathGest,
  updateBath,
  updateUmbrellas,
  removeBath,
};
