import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLList,
	GraphQLString,
	GraphQLInt,
	GraphQLNonNull,
} from 'graphql';
const app = express();
import { comparePoaps } from './api.mjs';

const address1 = '0xABe46A3a4fBd37e4E0BA92a61FeCd5eaa58C80EA';
const address2 = '0xB405b3E6494CAc9a88660362Ee19C38E955E2C6E';

const res = await comparePoaps(address1, address2);

const PoapType = new GraphQLObjectType({
	name: 'POAP',
	description: 'This is a shared POAP between two accounts',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		description: { type: GraphQLNonNull(GraphQLString) },
		image_url: { type: GraphQLNonNull(GraphQLString) },
	}),
});

const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		address: {
			type: GraphQLString,
			description: 'Profile address',
			resolve: () => address1,
		},
		follower: {
			type: GraphQLString,
			description: 'Follower address',
			resolve: () => address2,
		},
		poaps: {
			type: new GraphQLList(PoapType),
			description: 'Shared POAPs',
			resolve: () => res,
		},
	}),
});

const schema = new GraphQLSchema({
	query: RootQueryType,
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		graphiql: true,
	})
);

app.listen(3000, () => console.log('Server running'));
