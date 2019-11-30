const jwt = require('jsonwebtoken');
const user = require('../../model/user');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} = require('graphql');

const TOKEN_EXPIRES = 8 * 60 * 60;

const mutationUserType = new GraphQLObjectType({
    name: 'MutationUserType',
    description: '',
    fields: () => ({
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
    }),
});

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
    }
};


module.exports = {
    signUp: {
        type: mutationUserType,
        description: 'sign up',
        args: UserSignUpParams,
        resolve: async (_, args) => {

            const wordValidator = /^[0-9a-zA-Z]+$/;
            const emailValidator = /^[0-9a-zA-Z._]+@[0-9a-zA-Z._]+$/;

            if ( !wordValidator.test(args.account) ) throw Error('Invaild account');
            if ( !wordValidator.test(args.password) ) throw Error('Invaild throw password');
            if ( !emailValidator.test(args.email) ) throw Error('Invaild throw email');
            if ( !wordValidator.test(args.name) ) throw Error('Invaild throw name');

            const payload = {
                account: args.account,
                email: args.email,
                name: args.name,
            };

            const authtoken = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: TOKEN_EXPIRES });

            try {
                await user.insertUser({ ...payload, password: args.password, authtoken });

                return await user.getUser(payload);
            } catch (err) {
                throw new Error('This account has already been used');
            }
        }
    },
    signIn: {
        type: mutationUserType,
        description: 'sign in',
        args: UserSignInParams,
        resolve: async (_, args) => {

            const wordValidator = /^[0-9a-zA-Z]+$/;

            if ( !wordValidator.test(args.account) ) throw Error('Invaild Account');
            if ( !wordValidator.test(args.password) ) throw Error('Invaild password');

            const payload = {
                account: args.account,
                password: args.password,
            };

            const authtoken = jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: TOKEN_EXPIRES });

            try {
                await user.updateTokenWithAccountAndPwd(payload, authtoken);
            } catch (err) {
                throw Error('Invalid account or password');
            }

            return await user.getUser(payload);
        }
    }
};