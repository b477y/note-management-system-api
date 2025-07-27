import {
  GraphQLSchema,
  GraphQLObjectType,
} from "graphql";
import { notesFields } from "./fields/note.fields.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...notesFields.Query,
    },
  }),
});