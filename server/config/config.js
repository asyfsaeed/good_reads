module.exports = {
    development: {
      jwtSecret: process.env.SECRET || 'awesome_secret',
      username: process.env.DATABASE_USERNAME || 'goodreads',
      password: process.env.DATABASE_PASSWORD || 'goodreads',
      database: process.env.DATABASE_NAME || 'goodreads',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    test: {
      jwtSecret: process.env.SECRET || 'awesome_secret',
      username: process.env.DATABASE_USERNAME || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'mysecretpassword',
      database: 'goodreads_test',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    production: {
      jwtSecret: process.env.SECRET || 'awesome_secret',
      username: process.env.DATABASE_USERNAME || 'goodreads',
      password: process.env.DATABASE_PASSWORD || 'goodreads',
      database: process.env.DATABASE_NAME || 'goodreads',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
  };