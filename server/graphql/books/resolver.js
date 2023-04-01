

const { GraphQLError } = require('graphql');

const checkAuth = (authScope) => {
  if (!authScope.user) {
    throw new GraphQLError('User is not authenticated', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  } 
}

const bookResolvers = {
  Query: {
    books: async (root, args, { authScope, models: { Book } }) => {
      await checkAuth(authScope);
      return Book.findAll();
    },
    user: async (root, { id }, { authScope, models: { Book } }) => {
      await checkAuth(authScope);
      return Book.findByPk(id)},
  },
  Mutation: {
    addBook: async (root, { title, author, date, cover_image }, {authScope, models: { Book } }) => {
      await checkAuth(authScope);

      const book = await Book.findOne({ where: { title }});

      if (book) {
          throw new GraphQLError('Book with title already exists', {
              extensions: {
                code: 'Not Found',
                http: { status: 404 },
              },
          });
      }

      return await Book.create({ title, author, date, cover_image });
    },
    updateBook: async (root, { id, title, author, date, cover_image}, {authScope, models: { Book } }) => {
      await checkAuth(authScope);

      const book = await Book.findByPk(id);

      if (!book) {
          throw new GraphQLError('Book not found', {
              extensions: {
                code: 'Not Found',
                http: { status: 404 },
              },
          });
      }

      return await Book.update({ title, author, date, cover_image}, { where: { id }});
    }
  },

};

module.exports = {
    bookResolvers
}