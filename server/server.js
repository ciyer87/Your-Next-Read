const express = require('express');
const path = require('path');
const {ApolloServer} = require('apollo-server-express');

// const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
//const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;
//const PORT = 3001

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// integrate our Apollo server with the Express application as middleware

const startup = async () => {
  await server.start();
  server.applyMiddleware({ app });
  return app;
};

startup();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//     // log where we can go to test our GQL API
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
//   });
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
 if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

 //app.use(routes);

 app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

 db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
