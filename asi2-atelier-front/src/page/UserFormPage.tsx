import React, { Dispatch, SetStateAction } from 'react';
import UserCreationForm from '../components/user-creation-form/UserCreationForm';

interface UserFormPageProps {
    setTitle: Dispatch<SetStateAction<string>>
  }
  

const UserFormPage: React.FC<UserFormPageProps> = ({setTitle}) => {

    let title = "Add an user";
    setTitle(title);

    return (
        <div>
            <UserCreationForm></UserCreationForm>
        </div>
    );
};

export default UserFormPage;