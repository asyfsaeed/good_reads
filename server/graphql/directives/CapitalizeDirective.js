
const { SchemaDirectiveVisitor } = require("apollo-server");

const { defaultFieldResolver, GraphQLString } = require('graphql');

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

class CapitalizeDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        const value = field;
        value.resolve = async (...args) => {
          const result = await resolve.apply(this, args);
          if (typeof result === 'string') {
            return capitalizeFirstLetter(result);
          }
          return result;
        };
      }
}

module.exports = {
    CapitalizeDirective
}