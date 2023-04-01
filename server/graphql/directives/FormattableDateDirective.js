
const { SchemaDirectiveVisitor } = require("apollo-server");

const { defaultFieldResolver, GraphQLString } = require('graphql');

const moment = require('moment');

class FormattableDateDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        const { defaultFormat } = this.args;
    
        field.args.push({
          name: 'format',
          type: GraphQLString,
        });
    
        const value = field;
    
        value.resolve = async (
          source,
          { format, ...otherArgs },
          context,
          info,
        ) => {
          const date = await resolve.call(this, source, otherArgs, context, info);
          // If a format argument was not provided, default to the optional
          // defaultFormat argument taken by the @date directive:
          //   return formatDate(date, format || defaultFormat);
          return moment(date).format(format || defaultFormat);
        };
    
        value.type = GraphQLString;
      }
}

module.exports = {
    FormattableDateDirective
}