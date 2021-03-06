import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
// import schema from "./schema";
import cors from "cors";
import { createServer } from "http";
import "dotenv/config";
import { createConnection } from "typeorm";
import {buildSchema} from 'type-graphql';
import {UserResolver} from './resolver/UserResolver';
import {BoardResolver} from './resolver/BoardResolver';
import {MaskResolver} from './resolver/MaskResolver';
import {CoronaWorldResolver} from './resolver/CoronaWorldResolver';
import {CoronaKoreaResolver} from './resolver/CoronaKoreaResolver'
import {CommentResolver} from './resolver/CommentResolver';
import {CoronaKoreaCityResolver} from './resolver/CoronaKoreaCityResolver';
import {ApolloContext} from './context/ApolloContext';
import {ApolloAuthChecker} from'./validator/AuthChecker';

// import {auth} from './middleware/auth';

const corsOptions = {
  origin: "http://localhost:19006",
  credentials: true,
};

createConnection()
  .then(async () => {
    const app = express();

    const server = new ApolloServer({
      context: ApolloContext,
      schema: await buildSchema({
        resolvers: [UserResolver,BoardResolver,MaskResolver,CoronaWorldResolver,CoronaKoreaResolver,CoronaKoreaCityResolver,CommentResolver],
        authChecker: ApolloAuthChecker,
      }),
      validationRules: [depthLimit(7)],
      tracing: true
    });

    app.use("*", cors(corsOptions));

    server.applyMiddleware({ app, path: "/graphql" });

    const httpServer = createServer(app);
    httpServer.listen({ port: 8000 }, (): void =>
      console.log("Server listening on port 8000")
    );
  })
  .catch((err) => console.error(err));