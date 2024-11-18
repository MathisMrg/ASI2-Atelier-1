import { Message, MessageDTO } from "../model/messageModel";

const API_URL = "http://localhost:8083/chat/get-all";

export const getMessagesHistory = async (): Promise<MessageDTO[] | null> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching users : ${response.statusText}`);
    }

    const data: MessageDTO[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};