module.exports = {
    development: {
      username: process.env.DATABASE_USERNAME || 'goodreads',
      password: process.env.DATABASE_PASSWORD || 'goodreads',
      database: process.env.DATABASE_NAME || 'goodreads',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    test: {
      username: process.env.DATABASE_USERNAME || 'goodreads',
      password: process.env.DATABASE_NAME || 'goodreads',
      database: process.env.TEST_DATABASE_NAME || 'goodreads_test',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
    production: {
      username: process.env.DATABASE_USERNAME || 'goodreads',
      password: process.env.DATABASE_PASSWORD || 'goodreads',
      database: process.env.DATABASE_NAME || 'goodreads',
      host: '127.0.0.1',
      port: 5432,
      dialect: 'postgres',
    },
  };