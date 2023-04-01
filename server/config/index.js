const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    jwtSecret: process.env.SECRET || 'awesome_secret',
    database: process.env.DATABASE_NAME || 'goodreads',
    username: process.env.DATABASE_USERNAME || 'goodreads',
    password: process.env.DATABASE_PASSWORD || 'goodreads',
    port: 5432,
    dialect: 'postgres'
}