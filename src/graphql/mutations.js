import { gql } from '@apollo/client';

export const SIGN_IN_USER = gql`
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        id 
        name
        email
      }
    }
`;

export const UPDATE_BOOK_COLLECTION = gql`
    mutation UpdateBookCollection($book_id: ID!, $collection: String!) {
      updateCollection(book_id: $book_id, collection: $collection) {
        id
        title
        cover_image
        author
        date
        collection
      }
    }
`;

