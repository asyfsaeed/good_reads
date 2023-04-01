const { userResolvers } = require('./user/resolver');
const { bookResolvers } = require('./books/resolver');
const { dataScalarType } = require('./scalars');

const combinedResolvers = [dataScalarType,
    userResolvers, bookResolvers]

module.exports = {
    combinedResolvers
}