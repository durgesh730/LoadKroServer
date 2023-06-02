var jwt = require("jsonwebtoken");
const JWT_SECRET = 'durgeshchaudharydurgeshchaudhary';

const fetchuser = (req, res, next) => {
    // get the user from the jwt token id req object
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: " Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: " Please authenticate using a valid token" })
    }
}

const localVariables = (req, res, next)=>{
    req.app.locals = {
       OTP:null,
       resetSession:false
    }
    next();
}

module.exports = fetchuser, localVariables;