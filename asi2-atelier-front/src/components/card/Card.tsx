import React from 'react';
import CardHeader from './card-header/CardHeader';
import CardDescription from './card-description/CardDescription';
import CardStatistics from './card-statistics/CardStatistics';
import CardPrice from './card-price/CardPrice';
import './Card.css'
import {useSelector} from "react-redux";

const Card: React.FC = () => {

  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);

  return (
    <div className="card">
      <CardHeader />
      <img src={selectedCard?.imgUrl} alt="card image" className="card-image" />
      <CardDescription />
      <CardStatistics />
      <CardPrice />
    </div>
  );
};

export default Card;
