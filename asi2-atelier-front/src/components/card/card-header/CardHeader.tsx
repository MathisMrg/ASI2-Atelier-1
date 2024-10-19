import React from 'react';
import { useSelector } from 'react-redux';

const CardHeader: React.FC = () => {
  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);

  return (
    <div className="card-header">
      <span>❤️ {selectedCard?.hp}</span>
      <h1>{selectedCard?.name}</h1>
      <span>{selectedCard?.energy} ⚡</span>
    </div>
  );
};

export default CardHeader;
