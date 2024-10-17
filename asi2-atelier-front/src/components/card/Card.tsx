import React from 'react';
import CardHeader from './CardHeader';
import CardDescription from './CardDescription';
import CardStatistics from './CardStatistics';
import CardPrice from './CardPrice';
import './Card.css'

const Card: React.FC = () => {
  return (
    <div className="card">
      <CardHeader />
      <img src="/logo192.png" alt="Superhero" className="card-image" />
      <CardDescription />
      <CardStatistics />
      <CardPrice />
    </div>
  );
};

export default Card;
