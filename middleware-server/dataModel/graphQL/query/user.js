const user = require('../../model/user');
const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'QueryUser',
    description: '',
    fields: () => ({
        id: {
            type: GraphQLNonNull(GraphQLID),
            description: 'user id',
        },
        account: {
            type: GraphQLNonNull(GraphQLString),
            description: 'user account',
        },
        name: {
            type: GraphQLNonNull(GraphQLString),
            description: 'user name',
        },
        email: {
            type: GraphQLNonNull(GraphQLString),
            description: 'user email',
        },
        authtoken: {
            type: GraphQLString,
            description: 'user authtoken',
        }
    })
});

const UserQueryParams = {
    id: {
        type: GraphQLID,
        description: 'user id',
    },
    account: {
        type: GraphQLString,
        description: 'user account',
    },
    name: {
        type: GraphQLString,
        description: 'user name',
    },
    email: {
        type: GraphQLString,
        description: 'user email',
    },
};


module.exports = {
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
};