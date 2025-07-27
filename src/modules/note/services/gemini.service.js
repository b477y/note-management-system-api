import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not exist in your .env file.");
}

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

/**
 * Generates a summary of the given content using the Google Gemini AI model.
 *
 * @param {string} content - The text content of the note to be summarized.
 * @returns {Promise<string>} A promise that resolves to the summarized text.
 * @throws {Error} If content is not provided or is not a string, or if the Gemini API call fails.
 */
export const getSummaryFromGemini = async (content) => {
  if (!content || typeof content !== "string") {
    throw new Error("Note's content should be provided.");
  }

  const prompt = `Can you make this note shorter and easier to understand?
  "${content}"`;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });
    const response = await result.text;

    console.log(response);

    return response;
  } catch (error) {
    console.error("Error calling Gemini API for summarization:", error);
    throw new Error("Failed to get summary from AI model.");
  }
};
