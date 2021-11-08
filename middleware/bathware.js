const { Bath } = require('../models/bath'),
  { clearCache } = require('redis_mongoose'),
  config = require('../config/config'),
  {
    redis: { time },
  } = config,
  cacheOptions = { ttl: time },
  sortUmbrellaOptions = { av_umbrellas: 1, name: 1 };

// ADD A BATH
async function createBath(bath_data) {
  clearCache();
  return await Bath.create(bath_data);
}

// SEARCH FOR BATHS USING CITY AND REGION INFOS
async function getBathDispLoc(city, prov) {
  return await Bath.find({
    av_umbrellas: { $gt: 0 }, // av_umbrellas > 0
    city: city,
    province: prov,
  })
    .sort(sortUmbrellaOptions) // asc
    .limit(20)
    .lean()
    .cache(cacheOptions);
}

// SEARCH FOR BATHS USING COORDINATES
async function getBathDispCoord(lat, long) {
  try {
    return await Bath.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [long, lat] },
          $maxDistance: 10000, // meters
        },
      },
      av_umbrellas: { $gt: 0 },
    })
      .limit(20)
      .sort(sortUmbrellaOptions)
      .lean()
      .cache(cacheOptions);
  } catch (e) {
    console.log(e);
    return null;
  }
}

// GET SINGLE BATH
async function getBath(bid) {
  try {
    return await Bath.find({ _id: bid }).lean().cache(cacheOptions);
  } catch (e) {
    return null;
  }
}

// RETURN A MANAGER'S BATHS LIST
async function getBathGest(uid) {
  try {
    return await Bath.find({ uid: uid })
      .sort({ nome: 1 })
      .lean()
      .cache(cacheOptions);
  } catch (e) {
    return null;
  }
}

// UPDATE BATH INFO
async function updateBath(bid, bath_data) {
  clearCache();
  const check = await Bath.exists({ _id: bid });
  if (check)
    return await Bath.findByIdAndUpdate(bid, bath_data, {
      new: true,
    }).lean();
  else {
    return null;
  }
}

// UPDATE NUMBER OF AVAILABLE UMBRELLAS
async function updateUmbrellas(bid, available) {
  clearCache();
  return await Bath.findByIdAndUpdate(
    bid,
    { av_umbrellas: available },
    { new: true }
  ).lean();
}

// DELETE A BATH
async function removeBath(bid) {
  clearCache();
  return await Bath.findByIdAndDelete(bid).lean();
}

module.exports = {
  createBath: createBath,
  getBathDispLoc: getBathDispLoc,
  getBathDispCoord: getBathDispCoord,
  getBath: getBath,
  getBathGest: getBathGest,
  updateBath: updateBath,
  updateUmbrellas: updateUmbrellas,
  removeBath: removeBath,
};
