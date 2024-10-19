import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardList from "../components/buy/CardList";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Card from '../components/card/Card';
import { CardModel } from '../model/cardModel';

interface BuyPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const SellPage: React.FC<BuyPageProps> = ({setTitle}) => {

  const dispatch = useDispatch();

  const selectCard = (card: CardModel | null) => {
    dispatch({ type: "UPDATE_SELECTED_CARD", payload: card });
  };

  useEffect(() => {
    let title="Sell your cards to get money"
    setTitle(title);
    selectCard(null);
  }, [setTitle]);

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);
  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  if (!selectedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="shop-elements">
        <CardList isShop={false} ></CardList>
        {selectedCard ? <Card isShop={false}></Card> : <span></span>}
    </div>
  );
};

export default SellPage;