const  gql = require('graphql-tag');

const bookType = gql`
  type Book {
    id: String
    title: String
    author: String
    date: String
    cover_image: String
    rating: String
  }
  
  type Books {
    count: Int
    books: [Book]
  }

  extend type Query {
    book(id: ID!): Book
    books: [Book!]
  }

  extend type Mutation {
    addBook(title: String!, author: String!, date: String!, cover_image: String!): Book
    updateBook(id: String!, title: String, author: String, date: String, cover_image: String, rating: Int): Book
  }
`;

module.exports = {
    bookType
}
