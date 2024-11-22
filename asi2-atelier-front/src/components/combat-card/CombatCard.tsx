import React, {useEffect, useState} from 'react';
import "./CombatCard.css";
import { useSelector } from 'react-redux';
import {getUsers} from "../../service/UserService";
import {User} from "../../model/userModel";


interface CombatCardProps {
    room: any;
}
const CombatCard: React.FC<CombatCardProps> = ({ room }) => {
    const selectedCard = useSelector((state : any) => state.cardReducer.selectedCard);
    const [users, setUsers] = useState<User[] | null>(null);

    useEffect(() => {
        getUsers().then(users => {
            setUsers(users);
        });
    }, []);

    const opponent = users?.find(user => user.id !== room.fighter);

    const joinCombat = () => {
        console.log("On rejoint le combat");

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
