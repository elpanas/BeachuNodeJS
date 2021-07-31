const headerType = 'WWW-Authenticate',
  headerMessage = 'Basic realm: "Restricted Area"',
  errorMessage = 'Bathing establishments were not found',
  config = require('../config/config'),
  {
    app: { auth },
  } = config;

// AUTHORIZATION MANAGEMENT
function authManagement(req, res) {
  if (req.get('Authorization') != auth)
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
