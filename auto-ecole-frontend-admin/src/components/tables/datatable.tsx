"use client";

import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter, Column } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight, FaEye, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

// Interface pour une action personnalisée
interface Action {
    icon: React.ReactNode;
    onClick: (row: any) => void;
    className?: string;
    tooltip?: string;
    disabled?: (row: any) => boolean;
}

// Interface pour les props du composant
interface DataTableProps {
    columns: Column<any>[]; // Colonnes spécifiques
    data: any[]; // Données spécifiques
    actions?: Action[]; // Liste d'actions personnalisées
}

// Functional DataTable component
const DataTable: React.FC<DataTableProps> = ({ columns, data, actions = [] }) => {
    // Memoize page size options
    const pageSizeOptions = useMemo(() => [10, 20, 30], []);
    const normalizedData = useMemo(() => data || [], [data]); 


    // Normaliser les colonnes pour garantir un id
    const normalizedColumns = useMemo(() => {
        return columns.map((col, index) => {
            if (!col.id && typeof col.Header !== "string") {
                return { ...col, id: `col-${index}` }; // Ajouter un id par défaut si Header n'est pas une string
            }
            return col;
        });
    }, [columns]);

    // Ajouter la colonne "Actions" si nécessaire
    const enhancedColumns = useMemo(() => {
        const actionColumn: Column<any> = {
            Header: "Actions",
            id: "actions",
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    {actions.map((action, idx) => {
                        const isDisabled = action.disabled ? action.disabled(row.original) : false;
                        return (
                            <button
                                key={idx}
                                onClick={() => !isDisabled && action.onClick(row.original)}
                                className={`${action.className || "p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"} ${
                                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                                title={action.tooltip}
                                disabled={isDisabled}
                            >
                                {action.icon}
                            </button>
                        );
                    })}
                </div>
            ),
        };
        return actions.length > 0 ? [...normalizedColumns, actionColumn] : normalizedColumns;
    }, [normalizedColumns, actions]);

    // Initialize react-table hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter,
    } = useTable(
        {
            columns: enhancedColumns,
            data:normalizedData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    // Handle search input change
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value || "";
        setGlobalFilter(value);
    };

    return (
        <div className="p-4">
            {/* Top Section: Search and Entries Per Page */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-4">
                {/* Search Input */}
                <div className="w-full sm:w-64">
                    <div className="relative">
                        <input
                            onChange={handleFilterChange}
                            placeholder="Search..."
                            className="w-full border-0 rounded-lg px-4 py-2 text-sm text-gray-900 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                    </div>
                </div>
                {/* Entries Per Page Dropdown */}
                <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-700 dark:text-gray-400">
                        Entries per page:
                    </label>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* DataTable */}
            <div className="overflow-x-auto">
                <table
                    {...getTableProps()}
                    className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                >
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-6 py-3"
                                >
                    <span className="flex items-center">
                      {column.render("Header")}
                        {column.isSorted ? (
                            column.isSortedDesc ? (
                                <FaSortDown className="w-4 h-4 ms-1" />
                            ) : (
                                <FaSortUp className="w-4 h-4 ms-1" />
                            )
                        ) : (
                            <FaSort className="w-4 h-4 ms-1" />
                        )}
                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                {...row.getRowProps()}
                                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            >
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="px-6 py-4">
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            {/* Bottom Section: Pagination and Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mt-4">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                    Showing {pageIndex * pageSize + 1} to{" "}
                    {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}{" "}
                    entries
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <FaChevronLeft className="h-4 w-4" />
                    </button>
                    {pageOptions.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => gotoPage(idx)}
                            className={`border border-gray-200 rounded-lg px-3 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 ${
                                pageIndex === idx
                                    ? "bg-emerald-500 text-white"
                                    : "text-gray-700 dark:text-gray-400"
                            }`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="border border-gray-200 rounded-lg px-2 py-1 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <FaChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataTable;