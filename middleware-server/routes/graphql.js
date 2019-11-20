// var express = require('express');
// var router = express.Router();

const expressGraphQL = require('express-graphql');
const schema = require('../dataModel/graphQL/graphQLSchema');

module.exports = expressGraphQL({
    schema: schema,
    graphiql: true,
});