const { GraphQLSchema, GraphQLObjectType } = require('graphql');

const { user, users } = require('./query/user');
const { signIn, signUp } = require('./mutation/user');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'root query',
    fields: {
        users,
        user,
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'root mutation',
    fields: () => ({
        signUp,
        signIn
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});