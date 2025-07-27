import * as dbService from "../../db/db.service.js";
import { noteModel } from "../../db/models/note.model.js";

/**
 * Resolves the 'getNotes' GraphQL query to fetch a list of notes.
 * Supports filtering by user ID, title (case-insensitive partial match),
 * and creation date range. Also includes pagination.
 *
 * @param {object} args - The arguments passed to the GraphQL query.
 * @param {string} [args.userId] - Optional. The ID of the owner to filter notes by.
 * @param {string} [args.title] - Optional. A string to filter notes by title (case-insensitive).
 * @param {string} [args.startDate] - Optional.
 * @param {string} [args.endDate] - Optional.
 * @param {number} [args.page=1] - Optional. The page number for pagination. Defaults to 1.
 * @param {number} [args.limit=10] - Optional. The maximum number of notes per page. Defaults to 10.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of note objects.
 * @throws {Error} If there's a failure in fetching notes from the database.
 */
export const listAllNotesResolver = async (args) => {
  const {
    userId,
    title,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = args || {};

  const filter = {};
  const skip = (page - 1) * limit;

  if (userId) {
    filter.ownerId = userId;
  }

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  if (startDate || endDate) {
    filter.createdAt = {};
    if (startDate) {
      filter.createdAt.$gte = new Date(startDate);
    }
    if (endDate) {
      filter.createdAt.$lte = new Date(endDate);
    }
  }
  try {
    const notes = await dbService.find({
      model: noteModel,
      filter,
      skip,
      limit,
    });
    return notes;
  } catch (error) {
    throw new Error("Failed to fetch notes: " + error.message);
  }
};
