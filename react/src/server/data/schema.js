import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql';
import DiscsData from './discsdata';

/* eslint-disable no-console */
let discType = new GraphQLObjectType({
  name: "Disc",
  description: "Example of a disc album",
  fields: {
   title: {
     type: GraphQLString,
     description: "The title of the album",
   },
   artist: {
     type: GraphQLString,
     description: "Singer or band that released the album",
   },
   year: {
     type: GraphQLInt,
     description: "The year of release"
   },   
   id: {
     type: GraphQLInt,
     description: "ID of this Goldberg"
   }
 }
});

let queryByIdType = new GraphQLObjectType({
  name: "querybyid",
  description: "Discs query",
  fields: {
    discs: {
      type: discType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return DiscsData[args.id];
      }
    }
  }
});

let queryType = new GraphQLObjectType({
  name: "query",
  description: "Discs query",
  fields: {
    discs: {
      type: new GraphQLList(discType),      
      resolve: () => {
        return DiscsData;
      }
    }
  }
});

let Schema = new GraphQLSchema({
 query: queryType,
 queryById: queryByIdType
});

export default Schema;