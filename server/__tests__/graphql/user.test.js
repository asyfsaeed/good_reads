const { gql } = require('apollo-server-core') ;
const { client } = require('../base');

describe('userGraphl', () => {
  it('should register a user', async () => {
    const mutation = gql`
    mutation {
        register(name: "Asif", email: "admin@example.com", password: "123456"){
          token
        }
    }`;
    const mutationRes = await client.mutate({ mutation });
    expect(mutationRes.data).toEqual({ register: null });
  });
  it('should login a user', async () => {
    const mutation = gql`
    mutation {
        login(email: "admin@example.com", password: "123456"){
          token
        }
    }`;
    const mutationRes = await client.mutate({ mutation });
    expect(mutationRes.data).toEqual({ login: null });
  });

  it('should list all users', async () => {
    const query = gql`
    {
        users {
          email
          name
          id
        }
    }
    `;
    const clientRes = await client.query({ query });
    expect(clientRes.data).toEqual({
      users: null,
    });
  });
});
