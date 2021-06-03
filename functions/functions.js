require('dotenv').config();

function authManagement(req, res) {
    var check = req.get('Authorization'); 
    if (check != process.env.HASH_AUTH)
        res.status(401)
            .setHeader('WWW-Authenticate', 'Basic realm: "Rrestricted Area"')
            .send();  
}

function resultManagement(res, result) {
    try {
        if (result.length > 0)
            res.status(200).send(result);
        else
            res.status(404).send('Bathing establishments were not found'); 
    }
    catch (e) {
        res.status(404).send(e); 
    }
}

module.exports.authManagement = authManagement;
module.exports.resultManagement = resultManagement;