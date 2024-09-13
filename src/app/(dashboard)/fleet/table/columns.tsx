"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Unit } from "@/lib/definitions";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Unit>[] = [
	// {
	// 	id: "select",
	// 	enableHiding: false,
	// 	enableSorting: false,
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={
	// 				table.getIsAllPageRowsSelected() ||
	// 				(table.getIsSomePageRowsSelected() && "indeterminate")
	// 			}
	// 			onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
	// 			aria-label="Select all rows"
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox
	// 			checked={row.getIsSelected()}
	// 			onCheckedChange={(value) => row.toggleSelected(!!value)}
	// 			aria-label={`Select row with IMEI ${row.original.imei}`}
	// 		/>
	// 	),
	// },
	// {
	// 	id: "imei",
	// 	accessorKey: "imei",
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title="IMEI" />
	// 	),
	// 	cell: ({ row }) => {
	// 		return <div>{row.original.imei}</div>;
	// 	},
	// },
	{
		id: "name",
		accessorKey: "info.name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Name" />
		),
		cell: ({ row }) => {
			return (
				<div>{row.original.info ? row.original.info.name : "Unnamed"}</div>
			);
		},
	},
	{
		id: "panel size",
		accessorKey: "info.panel_size",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Set" />
		),
		cell: ({ row }) => {
			return (
				<div className="text-right">
					{row.original.info ? `${row.original.info.panel_size} Wp` : "--"}
				</div>
			);
		},
	},
	{
		id: "battery type",
		accessorKey: "info.battery_type",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Battery" />
		),
		cell: ({ row }) => {
			const batTypeMap = {
				0: "--",
				1: "Lead-Acid",
				2: "Lead-Acid",
				3: "Gel",
				4: "Lithium",
			};
			return (
				<div>
					{batTypeMap[row.original.info ? row.original.info.battery_type : 0]}
				</div>
			);
		},
	},
	{
		id: "battery voltage",
		accessorKey: "info.battery_voltage",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Volts" />
		),
		cell: ({ row }) => {
			return (
				<div className="text-right">
					{row.original.info ? `${row.original.info.battery_voltage} V` : "--"}
				</div>
			);
		},
	},
	{
		id: "make",
		accessorKey: "info.vehicle.make",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Make" />
		),
		cell: ({ row }) => {
			return (
				<div>{row.original.info ? row.original.info.vehicle.make : "--"}</div>
			);
		},
	},
	{
		id: "model",
		accessorKey: "info.vehicle.model",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Model" />
		),
		cell: ({ row }) => {
			return (
				<div>{row.original.info ? row.original.info.vehicle.model : "--"}</div>
			);
		},
	},
	{
		id: "year",
		accessorKey: "info.vehicle.year",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Year" />
		),
		cell: ({ row }) => {
			return (
				<div>{row.original.info ? row.original.info.vehicle.year : "--"}</div>
			);
		},
	},
	{
		id: "actions",
		header: () => <div className="sr-only">Actions</div>,
		cell: ({ row }) => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(row.original.imei)}
						>
							Copy IMEI
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={`/fleet/${row.original.imei}`}>
								Go to vehicle page
							</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
