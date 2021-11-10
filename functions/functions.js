const headerType = 'WWW-Authenticate',
  headerMessage = 'Basic realm: "Restricted Area"',
  errorMessage = 'Bathing establishments were not found',
  faker = require('faker/locale/it'),
  mongoose = require('mongoose'),
  config = require('../config/config'),
  {
    app: { auth },
  } = config;

async function createGeoIndex() {
  await mongoose.connection.db.createIndex('stabilimentis', {
    location: '2dsphere',
  });
}

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  if (req.get('Authorization') != auth) {
    return res.status(401).setHeader(headerType, headerMessage).send();
  }
}

async function postResultManagement(res, result) {
  try {
    if (typeof result !== 'undefined' && result != false) {
      await createGeoIndex();
      return res.status(201).send();
    } else {
      return res.status(400).send(errorMessage);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
}

// QUERY RESULT MANAGEMENT
function jsonResultManagement(res, result) {
  try {
    if (typeof result !== 'undefined' && result != false) {
      if (result != null && Object.keys(result).length > 0)
        return res.status(200).json(result);
    } else {
      return res.status(400).send();
    }
  } catch (e) {
    return res.status(400).send();
  }
}

function resultManagement(res, result) {
  if (typeof result !== 'undefined' && result) {
    if (Object.keys(result).length > 0) {
      return res.status(200).send();
    }
  } else {
    return res.status(400).send();
  }
}

// TEST FUNCTIONS
function generateCoordinates() {
  const coords = faker.address
    .nearbyGPSCoordinate([41.4566583, 15.5343864], 3)
    .reverse();

  return coords.reduce((pV, cV, cI) => {
    pV.push(parseFloat(cV));
    return pV;
  }, []);
}

// Generate fake json infos
function generatePostFakeInfos() {
  const newCoords = generateCoordinates(),
    umbrellas = faker.datatype.number(200);

  return {
    _id: '617c09616263be33dccdf5a2',
    name: `Bagno ${faker.name.firstName()}`,
    city: faker.address.city(),
    province: faker.address.county(),
    location: { type: 'Point', coordinates: newCoords },
    tot_umbrellas: umbrellas,
    av_umbrellas: umbrellas,
    uid: 'CdGMzNaQZZW6ckRqcEeWxFhauRa2',
    phone: faker.phone.phoneNumber(),
  };
}

function generatePutFakeInfos() {
  const newCoords = generateCoordinates(),
    umbrellas = faker.datatype.number(200);

  return {
    name: `Bagno ${faker.name.firstName()}`,
    city: faker.address.city(),
    province: faker.address.county(),
    location: { type: 'Point', coordinates: newCoords },
    tot_umbrellas: umbrellas,
    av_umbrellas: umbrellas,
    uid: 'CdGMzNaQZZW6ckRqcEeWxFhauRa2',
    phone: faker.phone.phoneNumber(),
  };
}

function generateMissingPostFakeInfos() {
  const newCoords = generateCoordinates(),
    umbrellas = faker.datatype.number(200);

  return {
    _id: '617c09616263be33dccdf5a2',
    city: faker.address.city(),
    province: faker.address.county(),
    location: { type: 'Point', coordinates: newCoords },
    tot_umbrellas: umbrellas,
    av_umbrellas: umbrellas,
    uid: 'CdGMzNaQZZW6ckRqcEeWxFhauRa2',
    phone: faker.phone.phoneNumber(),
  };
}

function generateWrongPostFakeInfos() {
  const newCoords = generateCoordinates(),
    umbrellas = faker.datatype.number(200);

  return {
    _id: '617c09616263be33dccdf5a2',
    name: `Bagno ${faker.name.firstName()}`,
    city: faker.address.city(),
    province: 35,
    location: { type: 'Point', coordinates: newCoords },
    tot_umbrellas: 'wrong value',
    av_umbrellas: umbrellas,
    uid: 'CdGMzNaQZZW6ckRqcEeWxFhauRa2',
    phone: faker.phone.phoneNumber(),
  };
}

module.exports = {
  authManagement: authManagement,
  createGeoIndex: createGeoIndex,
  postResultManagement: postResultManagement,
  jsonResultManagement: jsonResultManagement,
  resultManagement: resultManagement,
  generatePostFakeInfos: generatePostFakeInfos,
  generatePutFakeInfos: generatePutFakeInfos,
  generateMissingPostFakeInfos: generateMissingPostFakeInfos,
  generateWrongPostFakeInfos: generateWrongPostFakeInfos,
};
