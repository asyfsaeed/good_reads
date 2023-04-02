import { gql } from '@apollo/client';

export const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated {
      status
    }
  }
`;

export const GET_BOOKS_SEARCH = gql`
  query GetBooksBySearch($search: String!) {
    searchBooks(search: $search) {
      id
      title
      cover_image
      author
    }
  }
`;

export const GET_BOOK_BY_ID = gql`
  query GetBookById($id: ID!) {
    book(id: $id) {
      id
      title
      cover_image
      author
      date
      collection
    }
  }
`;

