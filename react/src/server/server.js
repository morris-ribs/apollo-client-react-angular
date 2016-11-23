import webpack from 'webpack';
import cors from 'cors';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import Schema from './data/schema';


/* eslint-disable no-console */
let graphQLServer = express();
graphQLServer.use(cors());
graphQLServer.use('/', graphqlHTTP({ schema: Schema, graphiql:true }));
graphQLServer.listen(8080, function(){
  console.log('Server running in port 8080');
});

