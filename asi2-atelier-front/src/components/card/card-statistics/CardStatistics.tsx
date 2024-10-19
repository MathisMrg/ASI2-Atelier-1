import React from 'react';
import { useSelector } from 'react-redux';

const CardStatistics: React.FC = () => {
  const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
  return (
    <div className="card-statistics">
      <div>
        <span>❤️ {selectedCard?.hp}</span>
        <span>🗡️ {selectedCard?.attack}</span>
      </div>
      <div>
        <span>🛡️ {selectedCard?.defence}</span>
        <span>⚡ {selectedCard?.energy}</span>
      </div>
    </div>
  );
};

export default CardStatistics;
