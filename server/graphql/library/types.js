const  gql = require('graphql-tag');

const libraryType = gql`
  type Subscription {
    libraryUpdated: Library
  } 

  type Library {
    id: String
    finished: String
    rating: Int
    collection: String
    book: Book
    user: User
  }

  type BookData {
    id: String
    title: String
    author: String
    date: String
    cover_image: String
    rating: String
    collection: String
    finished: Boolean
  }

  type BookExtended {
    books: [BookData]
    all_count: String
    read_count: String
    reading_count: String
    want_to_read_count: String
  }
  
  extend type Query {
    bookByCollection(collection: String!, sort: String, sort_by: String!): BookExtended
  }

  extend type Mutation {
    addToLibrary(book_id: Int!, collection: String!): Book
    updateCollection(book_id: ID!, collection: String!): Book
    markFinished(book_id: ID!, rating: String, finished: String): Book
  }
`;

module.exports = {
    libraryType
}
