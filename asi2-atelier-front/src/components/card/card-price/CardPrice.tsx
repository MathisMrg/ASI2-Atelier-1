import React from 'react';
import { useSelector } from 'react-redux';

const CardPrice: React.FC = () => {
  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  return (
    <div className="card-price">
      <span>💰 Price: {selectedCard?.price}</span>
    </div>
  );
};

export default CardPrice;
