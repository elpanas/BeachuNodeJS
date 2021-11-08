const headerType = 'WWW-Authenticate',
  headerMessage = 'Basic realm: "Restricted Area"',
  errorMessage = 'Bathing establishments were not found',
  faker = require('faker/locale/it'),
  config = require('../config/config'),
  {
    app: { auth },
  } = config;

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  if (req.get('Authorization') != auth) {
    return res.status(401).setHeader(headerType, headerMessage).send();
  }
}

// QUERY RESULT MANAGEMENT
function resultManagement(res, result) {
  try {
    if (typeof result !== 'undefined') {
      if (result != null) {
        if (result.length > 0) {
          return res.status(200).json(result);
        } else {
          return res.status(404).send(errorMessage);
        }
      } else {
        return res.status(404).send(errorMessage);
      }
    }
  } catch (e) {
    return 0;
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
  resultManagement: resultManagement,
  generatePostFakeInfos: generatePostFakeInfos,
  generatePutFakeInfos: generatePutFakeInfos,
  generateMissingPostFakeInfos: generateMissingPostFakeInfos,
  generateWrongPostFakeInfos: generateWrongPostFakeInfos,
};
