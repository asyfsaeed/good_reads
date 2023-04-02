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

export const GET_BOOKS_BY_COLLECTIONS = gql`
  query GetBookByCollection($collection: String!, $sort: String, $sort_by: String!) {
    bookByCollection(collection: $collection, sort: $sort, sort_by: $sort_by) {
      books {
        id
        title
        cover_image
        author
        date
        collection
        finished
        rating
      }
      all_count
      read_count
      reading_count
      want_to_read_count
    }
  }
`;

export const POST_SUBSCRIPTION = gql`
  subscription LibraryUpdated {
    libraryUpdated {
      id
      finished
      rating
      collection
      book {
        id
        title
        cover_image
        author
        date
      }
      user {
        id
        name
      }
    }
  }
`;


