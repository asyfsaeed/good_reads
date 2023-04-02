

const { GraphQLError } = require('graphql');

const { db, Sequelize } = require('../../models');
const Op = Sequelize.Op;

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
    book: async (root, { id }, { authScope, models: { Book, Library} }) => {
      await checkAuth(authScope);

      const foundBook = await Book.findByPk(id);

      const collection = await Library.findOne({ where: { BookId: foundBook.id, UserId: authScope.user.id }, attributes: ['id', 'collection']});
      return {
        id: foundBook.id,
        title: foundBook.title,
        author: foundBook.author,
        cover_image: foundBook.cover_image,
        date: foundBook.date,
        collection: collection?.collection || ''
      }
    },  
    searchBooks: async (root, { search }, { authScope, models: { Book } }) => {
      await checkAuth(authScope);
      if (search)
        return Book.findAll({ where: { title: { [Op.iLike]: `%${search}%` } }});
      else {
        return [];
      }
    }
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