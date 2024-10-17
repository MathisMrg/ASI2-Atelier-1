import React, { Dispatch, SetStateAction, useEffect } from 'react';

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
        <h2>Shop</h2>
    </div>
  );
};

export default ShopPage;