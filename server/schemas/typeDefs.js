// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: String!
        image: String!
        link: String!
    }

    type Query {
        me: User       
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: BookInput) : User
        deleteBook(bookId: String!): User
      }

      type User {
        _id: String
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
      }
      
      type Book {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
      }
      
      type Auth {
        token: ID!
        user: User
      }
`;

// export the typeDefs
module.exports = typeDefs;// import the gql tagged template function
