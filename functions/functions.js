const errorMessage = 'Bathing establishments were not found',
  mongoose = require('mongoose');

async function createGeoIndex() {
  return await mongoose.connection.db.createIndex('stabilimentis', {
    location: '2dsphere',
  });
}

async function postResultManagement(res, result) {
  try {
    if (typeof result !== 'undefined' && result != false) {
      await createGeoIndex();
      return res.status(201).json(result);
    } else {
      return res.status(400).send(errorMessage);
    }
  } catch (e) {
    return res.status(400).send();
  }
}

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

module.exports = {
  createGeoIndex: createGeoIndex,
  postResultManagement: postResultManagement,
  jsonResultManagement: jsonResultManagement,
  resultManagement: resultManagement,
};
