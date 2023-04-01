const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { User } = require('../models');


const authenticate = (plainPass, password) => {
    if (!plainPass) {
        return false;
    }
    return bcrypt.compareSync(plainPass, password);
}

const encryptPassword = (pass) => {
    return bcrypt.hashSync(pass, 8);
}

const generateToken = (user) => {
    return `JWT ${jwt.sign({ id: user.id, email: user.email }, jwtSecret)}`;
}

const getUser = async (token) => {
    if (!token) {
        return {
            user: null
        }
    }
    try {
        const decodedToken = jwt.verify(token, jwtSecret);

        const user = await User.findOne({ where: { id: decodedToken.id }});
        
        return {
            user,
        }
    } catch (err) {
        return {
            user: null,
        };
    }
}

module.exports = {
    authenticate,
    encryptPassword,
    generateToken,
    getUser
}