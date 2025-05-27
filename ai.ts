import { GoogleGenAI } from "@google/genai";
require("dotenv").config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-05-20",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main().catch((error) => {
  console.error("Error:", error);
});
