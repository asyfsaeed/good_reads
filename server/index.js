  (async () => {
    const express = require("express");
    const {ApolloServer} = require('@apollo/server');
    const { expressMiddleware } = require('@apollo/server/express4');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const http = require('http');
    const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
    
    const models = require('./models');
  
    const port = 3000;
  
    const { getUser } = require('./utils');
    
    const { combinedResolvers } = require('./graphql/combinedResolver');
  
    const { combinedTypes } = require('./graphql/combinedTypes');
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer({ 
      typeDefs: combinedTypes,
      resolvers: combinedResolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    
    await server.start();

    app.use(express.static('public'))
  
    app.use(
      cors({ origin: ['http://localhost:3001'], credentials: true,}),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({req, connection}) => {
          if (connection) {
            return connection.context;
          }
          
          return {
            authScope: await getUser(req.headers.authorization),
            models
          }
        }
      }),
    );

    models.sequelize.authenticate();

    models.sequelize.sync();
    
    await new Promise((resolve) => httpServer.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}`);
  })();
  
  