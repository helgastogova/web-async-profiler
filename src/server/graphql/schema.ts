import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    avatar: String!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      avatar: String!
      googleId: String!
    ): User!
  }

  type Query {
    getUsers: [User!]!
  }
`;
