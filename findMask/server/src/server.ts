import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import schema from './schema';
import cors from 'cors';
import { createServer } from 'http';
import mongoose from 'mongoose';
import 'dotenv/config';
// import {auth} from './middleware/auth';

const corsOptions = {
  origin: 'http://localhost:19006',
  credentials: true,
};
mongoose.Promise = global.Promise;
//env로 바꾸기.. 현재 dotenv를 써도 오류가 뜸.
mongoose.connect(process.env.MONGO_DB || "", { 
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
// app.use((req,res,next) => {
//   auth(req,res,next);
// })

server.applyMiddleware({app, path:'/graphql'});

const httpServer = createServer(app);
httpServer.listen({port: 8000},
  (): void => console.log('Server listening on port 8000'));

