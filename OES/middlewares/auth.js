const config = require('config');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if(!token) 
        return res.status(401).send('No token, Authorization denied')
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;