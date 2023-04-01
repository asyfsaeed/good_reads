const { GraphQLScalarType, Kind } = require('graphql');

const moment = require('moment');

const dataScalarType = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return moment(value).format('MMMM Do YYYY');
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
              }
              return null;
        }
    })
}

module.exports = {
    dataScalarType
}