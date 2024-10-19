import React from 'react';
import { useSelector } from 'react-redux';

const CardDescription: React.FC = () => {

  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  return (
    <div className="card-description">
      <p>
        {selectedCard?.description}
      </p>
    </div>
  );
};

export default CardDescription;
