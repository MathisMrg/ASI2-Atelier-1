import React, {useEffect, useMemo, useState} from 'react';
import { Card } from '../../model/cardModel';
import { COLUMNS } from './CardListColumns';
import { getCards } from '../../service/CardService';
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

const CardList: React.FC = () => {
    const [data, setData] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const columns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        const fetchData = async () => {
            const cards = await getCards(); // Appelez votre service pour récupérer les cartes
            if (cards) {
                setData(cards); // Mettre à jour l'état avec les données récupérées
            } else {
                setError("Failed to load cards");
            }
            setLoading(false); // Fin du chargement
        };

        fetchData();
    }, []); // Exécuter l'effet une seule fois lors du montage

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    // Gestion des états de chargement et d'erreur
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const { getHeaderGroups, getRowModel, getFooterGroups } = table;

    return (
        <TableContainer p={8}>
            <Heading>React Table Example</Heading>
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
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    {getFooterGroups().map((footerGroup) => (
                        <Tr key={footerGroup.id}>
                            {footerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    {flexRender(header.column.columnDef.footer, header.getContext())}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Tfoot>
            </Table>
        </TableContainer>
    );
};

export default CardList;
