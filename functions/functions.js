require('dotenv').config();

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  const check = req.get('Authorization');
  if (check != process.env.HASH_AUTH)
    res
      .status(401)
      .setHeader('WWW-Authenticate', 'Basic realm: "Restricted Area"')
      .send();
}

// QUERY RESULT MANAGEMENT
function resultManagement(res, result) {
  try {
    console.log(result);
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
