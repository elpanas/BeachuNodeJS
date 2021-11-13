const faker = require('faker/locale/it');
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
  generatePostFakeInfos: generatePostFakeInfos,
  generatePutFakeInfos: generatePutFakeInfos,
  generateMissingPostFakeInfos: generateMissingPostFakeInfos,
  generateWrongPostFakeInfos: generateWrongPostFakeInfos,
};
