const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    description: '',
    fields: () => ({
        id: {
            type: GraphQLID,
            description: 'user id',
        },
        account: {
            type: GraphQLString,
            description: 'user account',
        },
        password: {
            type: GraphQLString,
            description: 'user password',
        },
        name: {
            type: GraphQLString,
            description: 'user name',
        },
        email: {
            type: GraphQLString,
            description: 'user email',
        },
        authtoken: {
            type: GraphQLString,
            description: 'user authtoken',
        }
    })
});

const user = require('../DB/user');

module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            users: {
                type: GraphQLList(UserType),
                resolve: async () => (await user.getAll()).map(user => {
                    delete user.password;
                    return user;
                })
            },
        },
    }),
});