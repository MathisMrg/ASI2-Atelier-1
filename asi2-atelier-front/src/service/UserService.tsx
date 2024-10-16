import { User } from "../model/userModel";

const API_URL = "http://tp.cpe.fr:8083/user";

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching user with id ${id}: ${response.statusText}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const createUser = async (user: Partial<User>): Promise<User | null> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
