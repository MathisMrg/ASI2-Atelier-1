import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {User} from "../../model/userModel";
import {getUsers} from "../../service/UserService";
import "./OpponentChooseForm.css"

const OpponentChooseForm: React.FC = () => {
    const dispatch = useDispatch();
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const selectedUser = useSelector((state: any) => state.userReducer.selectedUser);

    useEffect(() => {
        const fetchData = async () => {
            const userList = await getUsers(); // Récupérer les utilisateurs depuis l'API ou le service
            if (userList) {
                // Filtrer la liste des utilisateurs pour exclure l'utilisateur sélectionné
                const filteredUsers = userList.filter((user) => user.id !== selectedUser?.id);
                setUsers(filteredUsers); // Mettre à jour l'état avec la liste filtrée
            } else {
                setError("Failed to load users");
            }
        };
        fetchData();
    }, [selectedUser]);

    const selectOpponent = (opponent: User) => {
        console.log("oui");
        dispatch({ type: "UPDATE_SELECTED_OPPONENT", payload: opponent });
    };

    const chooseOpponent = (opp : string) => {
        console.log("Choix de l'opposant d'id : "+opp);
        const foundOpponent = users?.find(user =>
            user.id === Number(opp)
        );
        console.log(foundOpponent);

        if(foundOpponent){
            selectOpponent(foundOpponent);
        }
    }
    return (
        <div className="choose-opp">
            <div>
                <h2>Choose your Opponent</h2>
            </div>

            <div>
                <select
                    className="select-opp"
                    onChange={(e) => chooseOpponent(e.target.value)}>
                    <option value="">-- Select an opponent --</option>
                    {users.map((user) => (
                        <option key={user.id as React.Key} value={String(user.id)}>
                            {user.lastName}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
};

export default OpponentChooseForm;
