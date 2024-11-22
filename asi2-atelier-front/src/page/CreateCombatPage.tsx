import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import OpponentChooseForm from "../components/opponent-choose-form/OpponentChooseForm";
import {useSocket} from "../SocketContext";

interface CreateCombatPageProps {
    setTitle: Dispatch<SetStateAction<string>>
}

const CreateCombatPage: React.FC<CreateCombatPageProps> = ({ setTitle }) => {
    const navigate = useNavigate();
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedOpponent = useSelector((state: any) => state.opponentReducer.selectedOpponent);
    const { socket, userId } = useSocket();

    useEffect(() => {
        let title = "Create Combat";
        setTitle(title);
    }, [setTitle]);

    const handleFightClick = () => {
        if (selectedOpponent == undefined){
            console.log("Pas d'opposent", selectedOpponent);
        }
        else{
            if (socket){
                socket.emit('create-battle-room', {
                    requesterId: selectedUser.id,
                    fighterId: selectedOpponent.id
                } );

                socket.on('battle-creation-response', (combat) => {
                    console.log('Combat reçu:', combat.state.id);
                    const combatId = combat.state.id;

                    navigate('/select-fight-cards', { state: { combatId } });
                });
            }
        }

    };

    if (!selectedUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="play-screen">
            <div>
                <OpponentChooseForm/>

                <div className="fight-btn-div">
                    <button className="fight-btn" onClick={handleFightClick}>Fight!</button>
                </div>
            </div>
        </div>
    );
};

export default CreateCombatPage;
