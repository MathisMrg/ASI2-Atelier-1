import React from 'react';
import CardHeader from '../card/card-header/CardHeader';
import CardDescription from '../card/card-description/CardDescription';
import CardStatistics from '../card/card-statistics/CardStatistics';
import CardPrice from '../card/card-price/CardPrice';
import '../card/Card.css'

const ShortCard: React.FC = () => {



    return (
        <div className="card">
        <CardHeader />
        <CardDescription />
        <CardStatistics />
        <CardPrice />

        </div>
    );
};

export default ShortCard;
