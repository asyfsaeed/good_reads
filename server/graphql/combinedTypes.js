const  gql = require('graphql-tag');
const { userType } = require('./user/types');
const { bookType } = require('./books/types');
const { libraryType } = require('./library/types');

const queryTypes = gql`
    scalar Date

    directive @capitalize on FIELD_DEFINITION
    directive @date(
      defaultFormat: String = "MMMM Do YYYY"
    ) on FIELD_DEFINITION

    type Query {
      _: Boolean
    }

    type Mutation {
      _: Boolean
    }
`;

const combinedTypes = [libraryType, userType, bookType, queryTypes];

module.exports = {
    combinedTypes
}