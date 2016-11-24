import graphqlHTTP from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLInputObjectType, GraphQLNonNull } from 'graphql';
import DiscsData from './discsdata';

/* eslint-disable no-console */
const discType = new GraphQLObjectType({
  name: "Disc",
  description: "Example of a disc album",
  fields: () => ({
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
 })
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

// Mutations
let CreateDiscType = new GraphQLInputObjectType({
  name: 'CreateDisc',
  fields: () => ({ // description of the fields { name_of_the_field: type_of_the_field }
          title: { type: new GraphQLNonNull(GraphQLString) },
          artist: { type: new GraphQLNonNull(GraphQLString) },
          year: { type: new GraphQLNonNull(GraphQLInt) },
          id: { type: new GraphQLNonNull(GraphQLInt) }
      })
});

let createDiscMutationType = {
  name: "CreateDiscMutation",
  type: new GraphQLList(discType),
  args:{              
    input: { 
      type: new GraphQLNonNull(CreateDiscType) }
  },
  resolve: (obj, {input}) => {
      let newDisc = {
        title: input.title,
        artist: input.artist,
        year: input.year,
        id: input.id       
      };      

      // insertion
      DiscsData.push(newDisc);
      return DiscsData;
  }    
};

let mutation = new GraphQLObjectType({
  name: 'MutationType',
   fields: () => ({
     createDiscMutation: createDiscMutationType
    })
});

let Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutation,
});

export default Schema;