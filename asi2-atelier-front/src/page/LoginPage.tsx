import LoginForm from "../components/login-form/LoginForm";
import React, { Dispatch, SetStateAction } from 'react';

interface LoginPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const LoginPage: React.FC<LoginPageProps> = ( {setTitle} ) => {

  const title = "Login";
  setTitle(title);

  return (
    <div className='page'>
      <LoginForm ></LoginForm>
    </div>
  );
};

export default LoginPage;