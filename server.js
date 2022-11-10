const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const app = express();

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		message: { type: GraphQLString, resolve: () => 'This is a test' },
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
});

app.use(
	'/graphql',
	expressGraphQL({
		schema: schema,
		graphiql: true,
	})
);
app.listen(3000, () => console.log('Server running!'));
