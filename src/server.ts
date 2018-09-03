import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';

import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';

import { ApolloServer, gql } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import { resolvers } from '../resolvers/resolvers';
import typeDefs from '../types/schema';

import User from '../models/User';
import Recipe from '../models/Recipe';

import { MONGO_URI, SECRET } from '../config/keys';

const port = process.env.PORT || 4000;

mongoose
  .connect(
    process.env.MONGODB_URI || MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

interface IExpressRequest extends express.Request {
  currentUser: any;
}

app.use(async (req: IExpressRequest, res, next) => {
  const token = req.headers['authorization'];
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, SECRET);
      req.currentUser = currentUser;
    } catch (error) {
      console.log(error);
    }
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req: { currentUser } }) => ({
    User,
    Recipe,
    currentUser
  })
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`Server listening at localhost:${port}${server.graphqlPath}`)
);
