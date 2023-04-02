const { userResolvers } = require('./user/resolver');
const { bookResolvers } = require('./books/resolver');
const { libraryResolvers } = require('./library/resolver');
const { dataScalarType } = require('./scalars');

const combinedResolvers = [dataScalarType,
    userResolvers, bookResolvers, libraryResolvers]

module.exports = {
    combinedResolvers
}