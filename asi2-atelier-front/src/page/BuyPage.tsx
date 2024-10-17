import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardList from "../components/buy/CardList";

interface BuyPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const ShopPage: React.FC<BuyPageProps> = ({setTitle}) => {

  useEffect(() => {
    let title="Buy a card to complete your collection"
    setTitle(title);
  }, [setTitle]);

  return (
    <div>
        <CardList ></CardList>
    </div>
  );
};

export default ShopPage;