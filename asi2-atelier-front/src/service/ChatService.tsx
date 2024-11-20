import { Message, MessageDTO } from "../model/messageModel";


export const getMessagesHistory = async (): Promise<MessageDTO[] | null> => {
  try {
    const response = await fetch(`http://${process.env.REACT_APP_BASE_URL}/chat/get-all`, {
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