const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLNonNull,
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
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
        // password: {
        //     type: GraphQLNonNull(GraphQLString),
        //     description: 'user password',
        // },
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

const UserSignUpParams = {
    account: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user account',
    },
    password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user password',
    },
    name: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user name',
    },
    email: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user email',
    }
};

const UserSignInParams = {
    account: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user account',
    },
    password: {
        type: GraphQLNonNull(GraphQLString),
        description: 'user password',
    },
};

module.exports = { UserType, UserQueryParams, UserSignUpParams, UserSignInParams };