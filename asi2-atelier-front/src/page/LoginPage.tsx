import React from 'react';
import UserCreationForm from '../components/user-creation-form/UserCreationForm';

const LoginPage: React.FC = () => {
  return (
    <div className='page'>
      <UserCreationForm ></UserCreationForm>
    </div>
  );
};

export default LoginPage;