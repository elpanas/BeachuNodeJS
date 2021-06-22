require('dotenv').config();

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  if (req.get('Authorization') != process.env.HASH_AUTH)
    res
      .status(401)
      .setHeader('WWW-Authenticate', 'Basic realm: "Restricted Area"')
      .send();
}

// QUERY RESULT MANAGEMENT
function resultManagement(res, result) {
  try {
    if (typeof result !== 'undefined' && result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('Bathing establishments were not found');
    }
  } catch (e) {
    res.status(400).send(e);
  }
}

module.exports.authManagement = authManagement;
module.exports.resultManagement = resultManagement;
