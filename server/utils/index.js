
const {authenticate, getUser, generateToken, encryptPassword } = require('./auth');

module.exports = {
    authenticate,
    getUser,
    generateToken,
    encryptPassword
}