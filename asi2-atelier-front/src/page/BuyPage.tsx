import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardList from "../components/buy/CardList";
import Card from  "../components/card/Card";
import '../components/card/Card.css'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface BuyPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const ShopPage: React.FC<BuyPageProps> = ({setTitle}) => {

  useEffect(() => {
    let title="Buy a card to complete your collection"
    setTitle(title);
  }, [setTitle]);

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);
  if (!selectedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="shop-elements">
        <CardList ></CardList>
        <Card></Card>
    </div>
  );
};

export default ShopPage;