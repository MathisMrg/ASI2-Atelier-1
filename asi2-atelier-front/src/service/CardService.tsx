import { CardModel } from "../model/cardModel";

const API_URL = "http://localhost:8083/cards";
const API_URL2 = "http://localhost:8083/card";

export const getCards = async (): Promise<CardModel[] | null> => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching cards: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const getCardById = async (id: number): Promise<CardModel | null> => {
    const vraiId = id.toString();
    try {
        const response = await fetch(`${API_URL2}/${vraiId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching user with id ${id}: ${response.statusText}`);
        }

        const data: CardModel = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};