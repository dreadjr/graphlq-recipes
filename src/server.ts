import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
// const test = require('../config/test');

import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from '../resolvers/resolvers';
import { typeDefs } from '../types/schema';

import User from '../models/User';
import Recipe from '../models/Recipe';

import { MONGO_URI } from '../config/keys';

const port = process.env.PORT || 4000;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Recipe
  }
});

mongoose
  .connect(
    process.env.MONGODB_URI || MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

server.applyMiddleware({ app });
app.listen(port, () =>
  console.log(`Server listening at localhost:${port}${server.graphqlPath}`)
);

// class Server {
//   public app: express.Application;

//   public config(): void {
//     const MONGO_URI: string = test.TEST_DB;
//     mongoose.connect(
//       MONGO_URI || process.env.MONGODB_URI,
//       { useNewUrlParser: true }
//     );

//     this.app.use(bodyParser.urlencoded({ extended: true }));
//     this.app.use(bodyParser.json());
//   }

//   public routes(): void {

//   }

//   constructor() {
//     this.app = express();
//     this.config();
//     this.routes();
//   }
// }
