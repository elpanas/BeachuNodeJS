const headerType = 'WWW-Authenticate',
  headerMessage = 'Basic realm: "Restricted Area"',
  {
    app: { auth },
  } = require('../config/config');

module.exports = (req, res, next) => {
  if (req.get('Authorization') != auth)
    return res.status(401).setHeader(headerType, headerMessage).send();

  next();
};
