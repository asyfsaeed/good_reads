import { ApolloServerBase } from 'apollo-server-core';
import { createTestClient } from 'apollo-server-testing';
import {combinedTypes} from '../../../server/graphql/combinedTypes';
import {combinedResolvers} from '../../../server/graphql/combinedResolver';
import faker from 'faker';

import models, { User } from '../../models';
import { encryptPassword } from '../../utils';

faker.seed(5711);
export { faker };
export const server = new ApolloServerBase({
  typeDefs: combinedTypes,
  context: () => ({
    user: {
      email: 'admin@example.com',
      id: '1',
      name: 'Asif',
    },
  }),
  resolvers: combinedResolvers,
});

export const createUser = async () => {
  const user = await User.create({
    name: `${faker.name.firstName()}-${faker.random.uuid()}`,
    email: `email-${faker.random.uuid()}@example.com`,
    password: encryptPassword('123456'),
  });
  return user;
};
export const client = createTestClient(server);
export const user = async () => createUser();
export const context = async () => ({ models, authScope: { user: await createUser() } });
export default {
  server, client, createUser, faker,
};
