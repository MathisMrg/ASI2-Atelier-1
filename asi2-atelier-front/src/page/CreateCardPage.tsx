import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardGenerationForm from '../components/card-generation-form/CardGenerationForm';
import Card from '../components/card/Card';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface CreateCardPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const CreateCardPage: React.FC<CreateCardPageProps> = ({setTitle}) => {

  useEffect(() => {
    let title="Generate a card"
    setTitle(title);
  }, [setTitle]);

  const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);
  if (!selectedUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
        <CardGenerationForm/>
    </div>
  );
};

export default CreateCardPage;