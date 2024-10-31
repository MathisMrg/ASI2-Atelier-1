import React from 'react';
import CardHeader from './card-header/CardHeader';
import CardDescription from './card-description/CardDescription';
import CardStatistics from './card-statistics/CardStatistics';
import CardPrice from './card-price/CardPrice';
import { SellModel } from '../../model/sellModel';
import './Card.css'
import {useDispatch, useSelector} from "react-redux";
import { buyCard, sellCard } from '../../service/CardService';
import { User } from '../../model/userModel';
import { getUsers } from '../../service/UserService';
import { Navigate } from 'react-router-dom';

interface CardProps {
  isShop: boolean;
}

const Card: React.FC<CardProps> = ({isShop}) => {

  const dispatch = useDispatch();
  const selectUser = (user: User) => {
    dispatch({ type: "UPDATE_SELECTED_USER", payload: user });
  };

  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

  async function sell() {
    const cardToSell : SellModel = {
      card_id: selectedCard.id ,
      user_id: selectedUser.id,
      store_id: 0,
    }
    const isCardSold = await sellCard(cardToSell);
    const users = await getUsers();
    const foundUser = users?.find(user => 
      user.id === selectedUser.id
    );
    if(isCardSold && foundUser){
      localStorage.setItem('user', JSON.stringify(foundUser));
      selectUser(foundUser);      //display a popup ?
      window.location.reload();
    }
  }

  async function buy() {
    const cardToBuy : SellModel = {
      card_id: selectedCard.id ,
      user_id: selectedUser.id,
      store_id: 0,
    }
    const isCardbought = await buyCard(cardToBuy);
    const users = await getUsers();
    const foundUser = users?.find(user => 
      user.id === selectedUser.id
    );
  
    if(isCardbought && foundUser){
      localStorage.setItem('user', JSON.stringify(foundUser));
      selectUser(foundUser);
      window.location.reload();
      //display a popup ?
    }
  }

  return (
    <div className="card">
      <CardHeader />
      <img   src={`${selectedCard?.imgUrl.startsWith('/') ? 'http://localhost:8083' : ''}${selectedCard?.imgUrl}`} alt="card image" className="card-image" />
      <CardDescription />
      <CardStatistics />
      <CardPrice />
      {isShop ? <button onClick={buy} >Acheter</button> : <button onClick={sell} >Vendre</button>}
    </div>
  );
};

export default Card;
