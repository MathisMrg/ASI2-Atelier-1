import React, {useEffect, useState} from 'react';
import "./CombatCard.css";
import { useSelector } from 'react-redux';
import {getUsers} from "../../service/UserService";
import {User} from "../../model/userModel";
import {useNavigate} from "react-router-dom";


interface CombatCardProps {
    room: any;
}
const CombatCard: React.FC<CombatCardProps> = ({ room }) => {
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);
    const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
    const [users, setUsers] = useState<User[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getUsers().then(users => {
            setUsers(users);
        });
    }, []);

    const opponent = users && selectedUser
        ? selectedUser.id === room.fighter
            ? users.find(user => user.id === room.requester)
            : users.find(user => user.id === room.fighter)
        : null;

    const joinCombat = () => {
        console.log("On rejoint le combat : "+JSON.stringify(room));
        const combatId = room.id;
        if (room.started === true){
            navigate('/fight', { state: { combatId } });
        }
        else {
            navigate('/select-fight-cards', { state: {combatId} });
        }
    };

    return (
        <div className="combat-card">
            <div className="info-combat-card">
                <h4>Combat</h4>
                <p>ID : {room.id}</p>
                <p>Opp : {opponent ? opponent.lastName : 'Non trouvé'}</p>
            </div>

            <button className="join-combat-btn" onClick={joinCombat}>
                Join
            </button>
        </div>
    );
};

export default CombatCard;
