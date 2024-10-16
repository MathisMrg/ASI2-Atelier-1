import React, { Dispatch, SetStateAction } from 'react';
import CardGenerationForm from '../components/card-generation-form/CardGenerationForm';

interface CreateCardPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const CreateCardPage: React.FC<CreateCardPageProps> = ({setTitle}) => {

  let title="Generate a card"
  setTitle(title)

  return (
    <div>
        <CardGenerationForm/>
    </div>
  );
};

export default CreateCardPage;