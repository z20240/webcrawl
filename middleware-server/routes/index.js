const rootRouter = require('./root');
const userRouter = require('./users');
const postgresRouter = require('./postgres');
const graphqlRouter = require('./graphql');


const route = {
    '/' : rootRouter,
    '/user' : userRouter,
    '/postgres' : postgresRouter,
    '/graphiql' : graphqlRouter,
};

module.exports = (app) => {
    for (const url in route) {
        const routerObj = route[url];
        app.use(url, routerObj);
    }

    return;
};