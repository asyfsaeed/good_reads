
const { encryptPassword, authenticate, generateToken } = require('../../utils');
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

const userResolvers = {
  Query: {
    users: async (root, args, { authScope, models: { User } }) => {
      await checkAuth(authScope);
      return User.findAll();
    },
    user: async (root, { id }, { authScope, models: { User } }) => {
      await checkAuth(authScope);
      return User.findByPk(id)},
  },
  Mutation: {
    register: async (root, { name, email, password }, { models: { User } }) => {
      try {
        const user = await User.create({
          name,
          email,
          password: encryptPassword(password),
        });
        return {
          token: generateToken(user),
        };
      } catch (error) {
        throw new Error(error.errors[0].message);
      }
    },
    login: async (root, { email, password }, { models: { User } }) => {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error('Invalid email or password');
        }
        const correctPassword = authenticate(password, user.password);
  
        if (!correctPassword) {
          throw new Error('Invalid email or password');
        }
        return {
          token: generateToken(user),
        };
    },
    updateUser: async (root, { id, name }, { models: { User } }) => User.update({
      name,
    }, {
      returning: true,
      where: {
        id,
      },
    }).then(([rowsUpdate, [updated]]) => (rowsUpdate ? updated.dataValues : {})),
    deleteUser: async (root, { id }, { models: { User }, authScope }) => {
      if (authScope.user === null || id !== authScope.user.id) {
        throw new Error('You cannot delete this user account!');
      }
      User.destroy({
        where: {
          id,
        },
      });
    },
  },

};

module.exports = {
    userResolvers
}