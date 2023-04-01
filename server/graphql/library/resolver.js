

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

const { pubsub } = require('../../utils');

const BOOK_FINISHED = 'BOOK_FINISHED';

const libraryResolvers = {
  Subscription: {
    book_finished: {
      subscribe: () => pubsub.asyncIterator([BOOK_FINISHED]),
    },
  },
  Query: {
    bookByCollection: async (root, { collection, sort = 'title', sort_by = 'ASC' }, { authScope, models: { Book, Library } }) => {
      await checkAuth(authScope);

      return await Library.findAll({ where: { collection }, include: {
        model: Book,
      }, order: [[sort, sort_by]]});
    }
  },
  Mutation: {
    addToLibrary: async (root, { book_id, collection }, {authScope, models: { Library, Book } }) => {
      try {
        await checkAuth(authScope);
        const book = await Book.findByPk(book_id);

        if (!book) {
            throw new GraphQLError('Book not found', {
                extensions: {
                  code: 'Not Found',
                  http: { status: 404 },
                },
            });
        }

        const checkLibrary = await Library.findOne({ where: { BookId: book_id, UserId: authScope.user.id } });

        if (checkLibrary) {
          throw new GraphQLError('Book already exists in library', {
            extensions: {
              code: 'Book Already exists',
              http: { status: 400 },
            },
        });
        }

        await Library.create({ BookId: book_id, UserId: authScope.user.id, collection });

        return book;

      } catch (error) {
        throw new Error(error.errors[0].message);
      }
    },
    updateCollection: async (root, { book_id, collection }, {authScope, models: { Library, Book } }) => {

      await checkAuth(authScope);

      const book = await Book.findByPk(book_id);

      if (!book) {
          throw new GraphQLError('Book not found', {
              extensions: {
                code: 'Not Found',
                http: { status: 404 },
              },
          });
      }

      const checkLibrary = await Library.findOne({ where: { BookId: book_id, UserId: authScope.user.id } });

      if (checkLibrary) {
        await Library.update({ collection }, { where: { BookId: book_id, UserId: authScope.user.id }});
      } else {
        await Library.create({ BookId: book_id, UserId: authScope.user.id, collection });
      }

      return book;
    },
    markFinished: async (root, { book_id, rating = 5, finished }, {authScope, models: { Library, Book } }) => {

      await checkAuth(authScope);

      const book = await Book.findByPk(book_id);

      if (!book) {
          throw new GraphQLError('Book not found', {
              extensions: {
                code: 'Not Found',
                http: { status: 404 },
              },
          });
      }

      await Library.update({ rating, is_finished: finished }, { where: { BookId: book_id, UserId: authScope.user.id }});

      let rating = book.rating + rating / 2;

      await Book.update({ rating }, { id: book_id });
    
      return book;
    }
  },

};

module.exports = {
    libraryResolvers
}