require('dotenv').config();
const headerType = 'WWW-Authenticate',
  headerMessage = 'Basic realm: "Restricted Area"',
  errorMessage = 'Bathing establishments were not found',
  hashAuth = process.env.HASH_AUTH;

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  if (req.get('Authorization') != hashAuth)
    res.status(401).setHeader(headerType, headerMessage).send();
}

// QUERY RESULT MANAGEMENT
function resultManagement(res, result) {
  typeof result !== 'undefined' && result
    ? res.status(200).json(result)
    : res.status(404).send(errorMessage);
}

module.exports = {
  authManagement: authManagement,
  resultManagement: resultManagement,
};
