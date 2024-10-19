import React from 'react';
import CardHeader from './card-header/CardHeader';
import CardDescription from './card-description/CardDescription';
import CardStatistics from './card-statistics/CardStatistics';
import CardPrice from './card-price/CardPrice';
import { SellModel } from '../../model/sellModel';
import './Card.css'
import {useSelector} from "react-redux";
import { buyCard, sellCard } from '../../service/CardService';

interface CardProps {
  isShop: boolean;
}

const Card: React.FC<CardProps> = ({isShop}) => {

  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

  async function sell() {
    const cardToSell : SellModel = {
      card_id: selectedCard.id ,
      user_id: selectedUser.id,
      store_id: 0,
    }
    const isCardSold = await sellCard(cardToSell);
    console.log(isCardSold)
    if(isCardSold){
      //display a popup ?
    }
  }

  async function buy() {
    const cardToBuy : SellModel = {
      card_id: selectedCard.id ,
      user_id: selectedUser.id,
      store_id: 0,
    }
    const isCardbought = await buyCard(cardToBuy);
    console.log(isCardbought)
    if(isCardbought){
      //display a popup ?
    }
  }

  return (
    <div className="card">
      <CardHeader />
      <img src={selectedCard?.imgUrl} alt="card image" className="card-image" />
      <CardDescription />
      <CardStatistics />
      <CardPrice />
      {isShop ? <button onClick={buy} >Acheter</button> : <button onClick={sell} >Vendre</button>}
    </div>
  );
};

export default Card;
