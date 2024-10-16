import React, { Dispatch, SetStateAction } from 'react';
import UserCreationForm from '../components/user-creation-form/UserCreationForm';

interface LoginPageProps {
  setTitle: Dispatch<SetStateAction<string>>
}

const LoginPage: React.FC<LoginPageProps> = ( {setTitle} ) => {

  const title = "Add a user";
  setTitle(title);

  return (
    <div className='page'>
      <UserCreationForm ></UserCreationForm>
    </div>
  );
};

export default LoginPage;