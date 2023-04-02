

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

const LIBRARY_UPDATED = 'LIBRARY_UPDATED';

const libraryResolvers = {
  Subscription: {
    libraryUpdated: {
      subscribe: () => {
        console.log('subscribiged');
        return pubsub.asyncIterator([LIBRARY_UPDATED])
      },
    },
  },
  Query: {
    bookByCollection: async (root, { collection, sort = 'title', sort_by = 'ASC' }, { authScope, models: { Book, Library } }) => {
      await checkAuth(authScope);

      let collectionQuery = { UserId: authScope.user.id };

      if (collection) {
        collectionQuery = {
          collection,
          UserId: authScope.user.id
        }
      }

      const bookData = await Book.findAll({ where: {}, include: {
        model: Book,
      }, order: [[sort, sort_by]], include: {
        required: true,
        model: Library,
        where:  collectionQuery
      }});

      let totalBooksCount = await Library.findAll({ where: { UserId: authScope.user.id }, attributes: ['id', 'collection']});

      const finalData = bookData.map(book => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          cover_image: book.cover_image,
          date: book.date,
          collection: book?.Libraries[0]?.collection || '',
          rating: book.rating,
          finished: book?.Libraries[0]?.finished || false
        }
      })

      return {
        books: finalData,
        all_count: totalBooksCount.length,
        read_count: totalBooksCount.filter(book => book.collection === 'READ').length || 0,
        reading_count: totalBooksCount.filter(book => book.collection === 'READING').length || 0,
        want_to_read_count: totalBooksCount.filter(book => book.collection === 'WANT_TO_READ').length || 0,
      };
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

      return {
        id: book.id,
        title: book.title,
        author: book.author,
        cover_image: book.cover_image,
        date: book.date,
        collection: collection || ''
      }
    },
    markFinished: async (root, { book_id, rating, finished = '' }, {authScope, models: { Library, Book, User } }) => {

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

      let updateObject = {}

      if (rating) {
        updateObject = {
          rating
        }
      } 

      if (finished == 'true' || finished == 'false') {
        updateObject = {
          finished: finished
        }
      }

      await Library.update(updateObject, { where: { BookId: book_id, UserId: authScope.user.id }});

      let ratingUpdate = +book.rating + +rating / 2;

      await Book.update({ rating: ratingUpdate }, { where: {id: book_id} });

      if (finished == 'true') {
        const libraryBookData = await Library.findOne({ where: { BookId: book_id, UserId: authScope.user.id }, attributes: ['id', 'finished', 'rating', 'collection', 'BookId', 'UserId'], include: [
          { 
            model: Book, 
            attributes: ['id', 'title', 'rating', 'date', 'cover_image', 'author'],
          },
          { 
            model: User, 
            attributes: ['id', 'name'],
          }
        ]});

        pubsub.publish(LIBRARY_UPDATED, {
          libraryUpdated: {
            id: libraryBookData.id,
            finished: libraryBookData.finished,
            rating: libraryBookData.rating,
            collection: libraryBookData.collection,
            book: {
              id: libraryBookData?.Book?.id,
              title: libraryBookData?.Book?.title,
              rating: libraryBookData?.Book?.rating,
              date: libraryBookData?.Book?.date,
              cover_image: libraryBookData?.Book?.cover_image,
              author: libraryBookData?.Book?.author,
            },
            user: {
              id: libraryBookData?.User?.id,
              name: libraryBookData?.User?.name
            }
          }
        });
      }
    
      return book;
    }
  },

};

module.exports = {
    libraryResolvers
}