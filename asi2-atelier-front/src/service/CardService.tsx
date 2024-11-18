import { CardModel } from "../model/cardModel";
import { SellModel } from "../model/sellModel";

const API_URL = `http://${process.env.REACT_APP_BASE_URL}/cards`;
const API_URL2 = `http://${process.env.REACT_APP_BASE_URL}/card`;
const STORE_URL = `http://${process.env.REACT_APP_BASE_URL}/store`;

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

export const getCardToBuy = async (): Promise<CardModel[] | null> => {
    try {
        const response = await fetch(`${STORE_URL}/cards_to_sell`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching card to sell: ${response.statusText}`);
        }

        const data: CardModel[] = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};

export const sellCard = async (sellModel : SellModel): Promise<Boolean | null> => {
    try {
      const response = await fetch(`${STORE_URL}/sell`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellModel),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
  
      const data: Boolean = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  
  export const buyCard = async (sellModel : SellModel): Promise<Boolean | null> => {
    try {
      const response = await fetch(`${STORE_URL}/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellModel),
      });
  
      if (!response.ok) {
        throw new Error(`Error creating user: ${response.statusText}`);
      }
  
      const data: Boolean = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };

  