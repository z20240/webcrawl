const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList,
} = require('graphql');

const { UserType, UserQueryParams, UserSignUpParams, UserSignInParams } = require('./userType');
const user = require('../model/user');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'root query',
    fields: {
        users: {
            type: GraphQLList(UserType),
            resolve: async () => user.getAll()
        },
        user: {
            type: UserType,
            args: UserQueryParams,
            resolve: async (_, args) => {
                return user.getUser(args);
            }
        }
    },
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'root mutation',
    fields: () => ({
        signUp: {
            type: UserType,
            description: 'sign up',
            args: UserSignUpParams,
            resolve: async (_, args) => {
                await user.insertUser(args);
                return await user.getUser(args);
            }
        },
        signIn: {
            type: UserType,
            description: 'sign in',
            args: UserSignInParams,
            resolve: async (_, args) => {
                await user.insertUser(args);
                return await user.getUser(args);
            }
        }
    }),
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});