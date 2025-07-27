import { GraphQLObjectType, GraphQLString, GraphQLID } from "graphql";
import * as dbService from "../../db/db.service.js";
import { UserType } from "./user.types.js";
import { userModel } from "../../db/models/user.model.js";

export const NoteType = new GraphQLObjectType({
  name: "NoteType",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    ownerId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    owner: {
      type: UserType,
      resolve: async (parent, args, context, info) => {
        if (parent.ownerId) {
          return await dbService.findById({
            model: userModel,
            id: parent.ownerId,
          });
        }
        return null;
      },
    },
  },
});
