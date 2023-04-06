# Getting Started with deploying Good Reads

Go to root directory for database dumps\
root/database_dumps\
restore postgres database dumps and server on localhost
goodreads.sql for dev and goodreads_test.sql for test environment

## Requirements

Node: 16.17.1
React: 17.0.2
Webpack: 5.78.0
Postgres 

## Installing React Dependencies and running

### `npm install`

### `npm run dev:ssr`

This will launch react app using ssr on port 3001.

## Running Server
### `npm run dev:server`

This will run server on port 3000.

## Running Tests
### `npm run test`

This will tests


## Credentials

Use admin@example.com and admin2@example.com having password 123456 to login with above database dumps
or use 

mutation {
  register(name: "admin", email: "admin@example.com", password: "123456") {
    token
  }
}

in http://localhost:3000/graphql to create your own user