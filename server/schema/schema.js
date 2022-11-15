const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLInt,
} = require('graphql');
const { comparePoaps } = require('../model/api');

const PoapType = new GraphQLObjectType({
	name: 'POAP',
	fields: () => ({
		id: { type: GraphQLInt },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		image_url: { type: GraphQLString },
	}),
});

const ProfileType = new GraphQLObjectType({
	name: 'Profile',
	fields: () => ({
		address: { type: GraphQLString },
		follower: { type: GraphQLString },
		sharedPoaps: { type: new GraphQLList(PoapType) },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		profile: {
			type: ProfileType,
			args: {
				address: { type: GraphQLString },
				follower: { type: GraphQLString },
			},
			resolve: async (parent, args) => {
				return await comparePoaps(args.address, args.follower);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
