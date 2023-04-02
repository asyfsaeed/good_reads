const  gql = require('graphql-tag');

const libraryType = gql`
  type Subscription {
    libraries: Library
  } 

  type Library {
    id: String
    finished: String
    rating: Int
    collection: String
    book: [Book]
  }

  extend type Query {
    bookByCollection(collection: String!, sort: String, sort_by: String!): [Book]
  }

  extend type Mutation {
    addToLibrary(book_id: Int!, collection: String!): Book
    updateCollection(book_id: ID!, collection: String!): Book
    markFinished(book_id: Int!, rating: String, finished: Boolean): Book
  }
`;

module.exports = {
    libraryType
}
