import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    profilePicture: { type: GraphQLString },
    deletedAt: { type: GraphQLString },
    changeCredentialsTime: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
