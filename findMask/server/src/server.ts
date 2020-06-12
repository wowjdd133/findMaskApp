import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';
import cors from 'cors';
import { createServer } from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

mongoose.Promise = global.Promise;
//env로 바꾸기.. 현재 dotenv를 써도 오류가 뜸.
mongoose.connect("mongodb+srv://dbUser:mP4r9J81W4HeUVA9@cluster0-qmlot.mongodb.net/board?retryWrites=true&w=majority", { 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,}); 

const app = express();

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
});

app.use('*', cors(corsOptions));

server.applyMiddleware({app, path:'/graphql'});

const httpServer = createServer(app);
httpServer.listen({port: 8000},
  (): void => console.log('Server listening on port 8000'));

