const  gql = require('graphql-tag');

const userType = gql`
  type User {
    id: String
    name: String
    email: String
  }
  
  type UserConnection {
    count: Int
    users: [User]
  }

  type UserAuth {
    token: String
    id: String
    name: String
    email: String
  }

  extend type Query {
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    register(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    deleteUser(id: Int!): UserConnection
    updateUser(id: Int!, name: String!): User
  }
`;

module.exports = {
    userType
}
