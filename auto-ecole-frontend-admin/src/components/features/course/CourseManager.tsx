"use client";

import React, { useState } from "react";
import { useCourse } from "@/contexts/CourseContext";
import {Column} from "react-table";
import {FaEdit, FaEye, FaTimes, FaTrash} from "react-icons/fa";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/tables/datatable";
import {Modal} from "@/components/ui/modal";
import Input from "@/components/custom-ui/input";
import Select from "@/components/form/Select";
import FileInput from "@/components/form/input/FileInput";
import ConfirmModal from "@/components/custom-ui/ConfirmModal";
import Toast from "@/components/custom-ui/Toast";
import Label from "@/components/form/Label";


const CourseManager: React.FC = () => {
    const {courses, loading, addCourse, editCourse, removeCourse} = useCourse();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // États pour le formulaire
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isTypeValid, setIsTypeValid] = useState(false);
    const [isFileValid, setIsFileValid] = useState(false);

    const isFormValid = isNameValid && isTypeValid && isFileValid;

    // Colonnes pour DataTable
    const columns: Column<any>[] = [
        {Header: "Nom", accessor: "name"},
        {Header: "Type", accessor: "type"},
        {
            Header: "Fichier",
            accessor: "file_path",
            Cell: ({ value }) => (
                <a
                    href={`http://localhost:8000/storage/${value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href=`http://localhost:8000/storage/${value}`;
                    }}
                >
                    Voir PDF
                </a>
            ),
        },
    ];

    // Actions pour DataTable
    const actions = [
        {
            icon: <FaEye className="h-5 w-5" />,
            onClick: (row: any) => window.open(`http://localhost:8000/storage/${row.file_path}`, `_blank`),
            className: "p-1 rounded-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900",
            tooltip: "Voir le PDF",
        },
        {
            icon: <FaEdit className="h-5 w-5" />,
            onClick: (row: any) => {
                setSelectedCourse(row);
                setName(row.name);
                setType(row.type);
                setFile(null); // Fichier non pré-rempli, mais reste optionnel
                setIsNameValid(true);
                setIsTypeValid(true);
                setIsFileValid(true); // Fichier optionnel pour modification
                setIsEditModalOpen(true);
            },
            className: "p-1 rounded-full text-green-600 hover:bg-green-100 dark:hover:bg-green-900",
            tooltip: "Modifier",
        },
        {
            icon: <FaTimes className="h-5 w-5" />,
            onClick: (row: any) => {
                setSelectedCourse(row);
                setIsConfirmModalOpen(true);
            },
            className: "p-1 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900",
            tooltip: "Supprimer",
        },
    ];

    // Réinitialiser le formulaire
    const resetForm = () => {
        setName("");
        setType("");
        setFile(null);
        setIsNameValid(false);
        setIsTypeValid(false);
        setIsFileValid(false);
    };

    // Gérer l’ajout
    const handleAddCourse = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        if (file) formData.append("file", file);

        try {
            await addCourse(formData);
            setToast({ message: "Cours ajouté avec succès", type: "success" });
            setIsAddModalOpen(false);
            resetForm();
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de l’ajout";
            setToast({ message: errorMessage, type: "error" });
        }
    };

// Gérer la modification
    const handleEditCourse = async () => {
        if (!selectedCourse) return;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        if (file) formData.append("file", file);

        try {
            await editCourse(selectedCourse.id, formData);
            setToast({ message: "Cours modifié avec succès", type: "success" });
            setIsEditModalOpen(false);
            resetForm();
            setSelectedCourse(null);
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de la modification";
            setToast({ message: errorMessage, type: "error" });
        }
    };

// Gérer la suppression
    const handleDeleteCourse = async () => {
        if (!selectedCourse) return;
        try {
            await removeCourse(selectedCourse.id);
            setToast({ message: "Cours supprimé avec succès", type: "success" });
            setIsConfirmModalOpen(false);
            setSelectedCourse(null);
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de la suppression";
            setToast({ message: errorMessage, type: "error" });
        }
    };

    return (
            <div className="p-6">
                <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="mb-4">
                    Ajouter un cours
                </Button>

                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <DataTable columns={columns} data={courses} actions={actions}/>
                )}

                {/* Modal d’ajout */}
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="max-w-lg p-6">
                    <h4 className="text-lg font-medium mb-4  dark:text-gray-400">Ajouter un cours</h4>
                    <div className="space-y-4">
                        <div>
                            
                            <Input
                                label={"Nom*"}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onValidationChange={(valid) => setIsNameValid(valid)}
                                placeholder="Nom du cours"
                                regex={/.+/} // Requis
                                errorMessage="Le nom est requis"
                            />
                        </div>
                        <div>
                            <Label>Type *</Label>
                            <Select
                                
                                options={[
                                    {value: "common", label: "Commun"},
                                    {value: "specific", label: "Spécifique"},
                                ]}
                                value={type}
                                onChange={(value) => {
                                    setType(value);
                                    setIsTypeValid(!!value);
                                }}
                                placeholder="Sélectionner un type"
                            />
                            {!isTypeValid && <p className="text-xs text-red-500 mt-1">Le type est requis</p>}
                        </div>
                        <div>
                            <Label >Fichier PDF *</Label>
                            <FileInput
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0] || null;
                                    setFile(selectedFile);
                                    setIsFileValid(!!selectedFile && selectedFile.type === "application/pdf");
                                }}
                            />
                            {!isFileValid && <p className="text-xs text-red-500 mt-1">Un fichier PDF est requis</p>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
                            Annuler
                        </Button>
                        <Button size="sm" onClick={handleAddCourse} disabled={!isFormValid}>
                            Ajouter
                        </Button>
                    </div>
                </Modal>

                {/* Modal de modification */}
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} className="max-w-lg p-6">
                    <h4 className="text-lg font-medium mb-4  dark:text-gray-400">Modifier le cours</h4>
                    <div className="space-y-4">
                        <div>
                            <Label className="block text-sm font-medium mb-1">Nom *</Label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onValidationChange={(valid) => setIsNameValid(valid)}
                                placeholder="Nom du cours"
                                regex={/.+/}
                                errorMessage="Le nom est requis"
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1">Type *</Label>
                            <Select
                                options={[
                                    { value: "common", label: "Commun" },
                                    { value: "specific", label: "Spécifique" },
                                ]}
                                value={type}
                                onChange={(value) => {
                                    setType(value);
                                    setIsTypeValid(!!value);
                                }}
                                placeholder="Sélectionner un type"
                            />
                            {!isTypeValid && <p className="text-xs text-red-500 mt-1">Le type est requis</p>}
                        </div>
                        <div>
                            <Label className="block text-sm font-medium mb-1">Fichier PDF (optionnel)</Label>
                            {selectedCourse && (
                                <p className="text-xs text-gray-500 mb-2">
                                    Fichier actuel :{" "}
                                    <a href={`http://localhost:8000/storage/${selectedCourse.file_path}`} target="_blank" className="text-blue-500">
                                        Voir le PDF actuel
                                    </a>
                                </p>
                            )}
                            <FileInput
                                onChange={(e) => {
                                    const selectedFile = e.target.files?.[0] || null;
                                    setFile(selectedFile);
                                    setIsFileValid(selectedFile ? selectedFile.type === "application/pdf" : true);
                                }}
                            />
                            {!isFileValid && <p className="text-xs text-red-500 mt-1">Le fichier doit être un PDF</p>}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                            Annuler
                        </Button>
                        <Button size="sm" onClick={handleEditCourse} disabled={!isFormValid}>
                            Sauvegarder
                        </Button>
                    </div>
                </Modal>

                {/* Modal de confirmation */}
                <ConfirmModal
                    isOpen={isConfirmModalOpen}
                    onClose={() => setIsConfirmModalOpen(false)}
                    onConfirm={handleDeleteCourse}
                    message="Êtes-vous sûr de vouloir supprimer ce cours ?"
                />

                {/* Toast */}
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}
            </div>
    );
    
}

export default CourseManager;