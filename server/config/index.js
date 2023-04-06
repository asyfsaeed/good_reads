const dotenv = require('dotenv');

dotenv.config();

const configsLoaded = require('./config');

const env = process.env.NODE_ENV || 'development';

module.exports = configsLoaded[env];