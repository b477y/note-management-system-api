import { asyncHandler } from "../../../utils/response/error.response.js";
import * as dbService from "../../../db/db.service.js";
import { noteModel } from "../../../db/models/note.model.js";
import { successResponse } from "../../../utils/response/success.response.js";
import { getSummaryFromGemini } from "./gemini.service.js";

/**
 * Create Note:
 * Requires title and content in the request body, and user authentication.
 * Checks if a note with the same title already exists for the authenticated user.
 * If unique, creates and stores the new note in the database, linking it to the user.
 */
export const createNote = asyncHandler(async (req, res, next) => {
  const { title, content } = req.body;

  const isExist = !!(await dbService.findOne({
    model: noteModel,
    filter: { title },
  }));

  if (isExist) {
    return next(
      new Error("This title is already used, please use another title", {
        cause: 409,
      })
    );
  }

  const data = { title, content, ownerId: req.user._id };
  await dbService.create({ model: noteModel, data });

  return successResponse({
    res,
    message: "Note added successfully",
    data: { noteTitle: title, noteContent: content },
  });
});

/**
 * Delete Note:
 * Requires note ID in request parameters and user authentication.
 * Checks if the note exists and belongs to the authenticated user.
 * If found and owned by the user, deletes the note from the database.
 */
export const deleteNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const isExist = !!(await dbService.findOne({
    model: noteModel,
    filter: { _id: id, ownerId: req.user._id },
  }));

  if (!isExist) {
    return next(
      new Error("This note is not exist", {
        cause: 404,
      })
    );
  }

  await dbService.findByIdAndDelete({ model: noteModel, id });

  return successResponse({
    res,
    message: "Note deleted successfully",
  });
});

/**
 * Summarize Note:
 * Requires note ID in request parameters.
 * Retrieves the content of the specified note.
 * Uses a Gemini service to generate a summary of the note's content and returns it.
 */
export const summarizeNote = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const isExist = !!(await dbService.findOne({
    model: noteModel,
    filter: { _id: id },
  }));

  if (!isExist) {
    return next(
      new Error("This note is not exist", {
        cause: 404,
      })
    );
  }

  const { content } = await dbService.findById({ model: noteModel, id });

  const summary = await getSummaryFromGemini(content);

  return successResponse({
    res,
    message: "Note summarized successfully",
    data: { summary },
  });
});
