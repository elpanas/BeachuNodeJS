/* eslint-disable eqeqeq */
const errorMessage = 'Bathing establishments were not found';
const mongoose = require('mongoose');

async function createGeoIndex() {
  return mongoose.connection.db.createIndex('stabilimentis', {
    location: '2dsphere',
  });
}

async function postResultManagement(res, result) {
  if (typeof result !== 'undefined' && result != false) {
    await createGeoIndex();
    return res.status(201).json(result);
  }
  return res.status(400).send(errorMessage);
}

function jsonResultManagement(res, result) {
  if (typeof result !== 'undefined' && result != false) {
    if (result != null && Object.keys(result).length > 0)
      return res.status(200).json(result);
  } else {
    return res.status(400).send();
  }
  return 0;
}

function resultManagement(res, result) {
  if (typeof result !== 'undefined' && result) {
    if (Object.keys(result).length > 0) {
      return res.status(200).send();
    }
  } else {
    return res.status(400).send();
  }
  return 0;
}

module.exports = {
  createGeoIndex,
  postResultManagement,
  jsonResultManagement,
  resultManagement,
};
