// var express = require('express');
// var router = express.Router();

const expressGraphQL = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            hello: {
                type: GraphQLString,
                resolve() {
                    return 'world';
                },
            },
        },
    }),
});

module.exports = expressGraphQL({
    schema: schema,
    graphiql: true,
});