import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import UserCards from "../components/user-cards/UserCards";
import OpponentChooseForm from "../components/opponent-choose-form/OpponentChooseForm";

interface CreateCombatPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const CreateCombatPage: React.FC<CreateCombatPageProps> = ({ setTitle }) => {
    useEffect(() => {
        let title = "Create Combat";
        setTitle(title);
    }, [setTitle]);


    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);


    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <div>
                <OpponentChooseForm />
                <div className="choose-card">
                    <h2>Choose your Cards </h2>
                    <UserCards/>
                </div>
            </div>
        </div>
    );
};

export default CreateCombatPage;
