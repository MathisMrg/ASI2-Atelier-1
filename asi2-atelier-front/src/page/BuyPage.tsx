import React, { Dispatch, SetStateAction } from 'react';

interface BuyPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const ShopPage: React.FC<BuyPageProps> = ({setTitle}) => {

  let title="Buy a card to complete your collection"
  setTitle(title)

  return (
    <div>
        <h2>Shop</h2>
    </div>
  );
};

export default ShopPage;