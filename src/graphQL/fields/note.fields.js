import { GraphQLID, GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { NoteType } from "../Types/note.types.js"; // Correct import for NoteType
import { listAllNotesResolver } from "../resolvers/note.resolver.js";

export const notesFields = {
  Query: {
    getNotes: {
      type: new GraphQLList(NoteType),
      args: {
        userId: { type: GraphQLID },
        title: { type: GraphQLString },
        startDate: { type: GraphQLString },
        endDate: { type: GraphQLString },
        page: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: async (parent, args, context, info) => {
        return await listAllNotesResolver(args);
      },
    },
  },
};
