import { ColumnDef } from "@tanstack/react-table";
import { Card } from "../../model/cardModel";

export const COLUMNS: ColumnDef<Card>[] = [
    {
        header: "Card Name",
        accessorKey: "name",
    },
    {
        header: "Description",
        accessorKey: "description",
    },
    {
        header: "Family",
        accessorKey: "family",
    },
    {
        header: "HP",
        accessorKey: "hp",
    },
    {
        header: "Energy",
        accessorKey: "energy",
    },
    {
        header: "Defense",
        accessorKey: "defence",
    },
    {
        header: "Attack",
        accessorKey: "attack",
    },
    {
        header: "Price",
        accessorKey: "price",
    },
];