import { Card } from "../model/cardModel";

const API_URL = "http://tp.cpe.fr:8083/cards";

export const getCards = async (): Promise<Card[] | null> => {
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