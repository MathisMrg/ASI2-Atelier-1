import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardList from "../components/buy/CardList";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface BuyPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const SellPage: React.FC<BuyPageProps> = ({setTitle}) => {

  useEffect(() => {
    let title="Sell your cards to get money"
    setTitle(title);
  }, [setTitle]);

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);
  if (selectedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
        <CardList ></CardList>
    </div>
  );
};

export default SellPage;