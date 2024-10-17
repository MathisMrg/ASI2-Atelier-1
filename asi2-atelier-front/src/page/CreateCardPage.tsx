import React, { Dispatch, SetStateAction, useEffect } from 'react';
import CardGenerationForm from '../components/card-generation-form/CardGenerationForm';
import Card from '../components/card/Card';

interface CreateCardPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const CreateCardPage: React.FC<CreateCardPageProps> = ({setTitle}) => {

  useEffect(() => {
    let title="Generate a card"
    setTitle(title);
  }, [setTitle]);

  return (
    <div>
        <CardGenerationForm/>
        <Card/>
    </div>
  );
};

export default CreateCardPage;