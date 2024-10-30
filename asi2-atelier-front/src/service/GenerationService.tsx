import { CardPrompt } from "../model/cardPromptModel";

const API_URL = "http://localhost:8083/generator/card";

export const createCardUsingPrompt = async (cardPrompt: CardPrompt): Promise<{ status: number | null }> => {
  try {
    console.log(cardPrompt);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardPrompt),
    });

    const status = response.status;
    if (!response.ok) {
      throw new Error(`Error creating card: ${response.statusText}`);
    }

    return { status };
  } catch (error) {
    console.error("Error creating card:", error);
    return { status: null };
  }
};