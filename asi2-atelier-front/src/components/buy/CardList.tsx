import React, { useEffect, useMemo, useState } from 'react';
import { CardModel } from '../../model/cardModel';
import { COLUMNS } from './CardListColumns';
import { getCardById, getCardToBuy, getCards } from '../../service/CardService';
import './CardList.css';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {
    Heading,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

interface CardListProps {
    isShop: boolean;
}

const CardList: React.FC<CardListProps> = ({ isShop }) => {
    const [data, setData] = useState<CardModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const columns = useMemo(() => COLUMNS, []);

    const selectedUser = useSelector((state : any) => state.userReducer.selectedUser);

    useEffect(() => {
        const fetchData = async () => {
            if (isShop) {
                const cards = await getCardToBuy(); // Appelez votre service pour récupérer les cartes
                if (cards) {
                    setData(cards); // Mettre à jour l'état avec les données récupérées
                } else {
                    setError("Failed to load cards");
                }
                setLoading(false); // Fin du chargement
            }
            else {
                const cards = await getCards(); // Appelez votre service pour récupérer les cartes
                if (cards) {
                    let userCards = cards.filter(card => card.userId === selectedUser.id);
                    setData(userCards); // Mettre à jour l'état avec les données récupérées
                } else {
                    setError("Failed to load cards");
                }
                setLoading(false); // Fin du chargement
            }
        };

        fetchData();
    }, []); // Exécuter l'effet une seule fois lors du montage

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    const dispatch = useDispatch();

    // Gestion des états de chargement et d'erreur
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { getHeaderGroups, getRowModel, getFooterGroups } = table;


    const selectCard = (card: CardModel) => {
        dispatch({ type: "UPDATE_SELECTED_CARD", payload: card });
    };

    const handleRowClick = async (cardId: number) => {
        console.log("Card ID:", cardId);

        const card = await getCardById(cardId);
        if (card) {
            selectCard(card);
            console.log(card);
        } else {
            setError("Failed to load the card");
        }
    };

    return (
        <TableContainer className="table-container">
            <Table>
                <Thead>
                    {getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {getRowModel().rows.map((row) => (
                        <Tr key={row.id} onClick={() => handleRowClick(row.original.id)}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                {/* <Tfoot>
                    {getFooterGroups().map((footerGroup) => (
                        <Tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {flexRender(header.column.columnDef.footer, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Tfoot> */}
            </Table>
        </TableContainer>
    );
};

export default CardList;
