"use client";

import React, { useState } from "react";
import { useTraining } from "@/contexts/TrainingContext";
import { Column } from "react-table";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import DataTable from "@/components/tables/datatable";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/custom-ui/input";
import Select from "@/components/form/Select";
import Label from "@/components/form/Label"; 
import Toast from "@/components/custom-ui/Toast";
import ConfirmModal from "@/components/custom-ui/ConfirmModal";

const TrainingManager: React.FC = () => {
    const { trainings, categories, loading, addTraining, editTraining, removeTraining } = useTraining();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [selectedTraining, setSelectedTraining] = useState<any>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const router = useRouter();

    // États pour le formulaire
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // Ajout de description
    const [startDate, setStartDate] = useState("");
    const [durationWeeks, setDurationWeeks] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [registrationEndDate, setRegistrationEndDate] = useState("");
    const [isTitleValid, setIsTitleValid] = useState(false);
    const [isDescriptionValid, setIsDescriptionValid] = useState(false); // Validation pour description
    const [isStartDateValid, setIsStartDateValid] = useState(false);
    const [isDurationValid, setIsDurationValid] = useState(false);
    const [isPriceValid, setIsPriceValid] = useState(false);
    const [isCategoryValid, setIsCategoryValid] = useState(false);
    const [isRegistrationEndDateValid, setIsRegistrationEndDateValid] = useState(false);

    const isFormValid =
        isTitleValid &&
        isDescriptionValid &&
        isStartDateValid &&
        isDurationValid &&
        isPriceValid &&
        isCategoryValid &&
        isRegistrationEndDateValid;

    // Colonnes pour DataTable (sans description)
    const columns: Column<any>[] = [
        { Header: "ID", accessor: "id" },
        { Header: "Titre", accessor: "title" },
        { Header: "Catégorie", accessor: "category.name" },
        { Header: "Date de début", accessor: "start_date" },
        { Header: "Durée (semaines)", accessor: "duration_weeks" },
        { Header: "Prix (Ar)", accessor: "price" },
    ];

    // Actions pour DataTable
    const actions = [
        {
            icon: <FaEye className="text-blue-500 hover:text-blue-700" />,
            onClick: (row: any) => router.push(`/trainings/${row.id}`),
            tooltip: "Voir les détails",
        },
        {
            icon: <FaEdit className="text-yellow-500 hover:text-yellow-700" />,
            onClick: (row: any) => {
                setSelectedTraining(row);
                setTitle(row.title);
                setDescription(row.description); // Charger description
                setStartDate(row.start_date);
                setDurationWeeks(row.duration_weeks.toString());
                setPrice(row.price.toString());
                setCategoryId(row.category_id.toString()); // Charger category_id
                setRegistrationEndDate(row.registration_end_date);
                setIsTitleValid(true);
                setIsDescriptionValid(true);
                setIsStartDateValid(true);
                setIsDurationValid(true);
                setIsPriceValid(true);
                setIsCategoryValid(true);
                setIsRegistrationEndDateValid(true);
                setIsEditModalOpen(true);
            },
            tooltip: "Modifier",
        },
        {
            icon: <FaTrash className="text-red-500 hover:text-red-700" />,
            onClick: (row: any) => {
                setSelectedTraining(row);
                setIsConfirmModalOpen(true);
            },
            tooltip: "Supprimer",
        },
    ];

    const resetForm = () => {
        setTitle("");
        setDescription(""); // Réinitialiser description
        setStartDate("");
        setDurationWeeks("");
        setPrice("");
        setCategoryId("");
        setRegistrationEndDate("");
        setIsTitleValid(false);
        setIsDescriptionValid(false);
        setIsStartDateValid(false);
        setIsDurationValid(false);
        setIsPriceValid(false);
        setIsCategoryValid(false);
        setIsRegistrationEndDateValid(false);
    };

    const handleAddTraining = async () => {
        const data = {
            title,
            description, // Inclure description
            start_date: startDate,
            duration_weeks: parseInt(durationWeeks),
            price: parseFloat(price),
            category_id: parseInt(categoryId),
            registration_end_date: registrationEndDate,
        };

        try {
            await addTraining(data);
            setToast({ message: "Formation ajoutée avec succès", type: "success" });
            setIsAddModalOpen(false);
            resetForm();
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de l’ajout";
            setToast({ message: errorMessage, type: "error" });
        }
    };

    const handleEditTraining = async () => {
        if (!selectedTraining) return;
        const data = {
            title,
            description, // Inclure description
            start_date: startDate,
            duration_weeks: parseInt(durationWeeks),
            price: parseFloat(price),
            category_id: parseInt(categoryId),
            registration_end_date: registrationEndDate,
        };

        try {
            await editTraining(selectedTraining.id, data);
            setToast({ message: "Formation modifiée avec succès", type: "success" });
            setIsEditModalOpen(false);
            resetForm();
            setSelectedTraining(null);
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de la modification";
            setToast({ message: errorMessage, type: "error" });
        }
    };

    const handleDeleteTraining = async () => {
        if (!selectedTraining) return;
        try {
            await removeTraining(selectedTraining.id);
            setToast({ message: "Formation supprimée avec succès", type: "success" });
            setIsConfirmModalOpen(false);
            setSelectedTraining(null);
        } catch (err: any) {
            const errorMessage = err.errors
                ? Object.values(err.errors).flat().join(", ")
                : err.message || "Erreur lors de la suppression";
            setToast({ message: errorMessage, type: "error" });
        }
    };

    const today = new Date().toISOString().split("T")[0]; // Date d’aujourd’hui pour restriction

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Gestion des formations en cours</h2>
            <Button size="sm" onClick={() => setIsAddModalOpen(true)} className="mb-4 bg-blue-500 hover:bg-blue-600 text-white">
                Ajouter une formation
            </Button>

            {loading ? (
                <p className="text-gray-700 dark:text-gray-300">Chargement...</p>
            ) : (
                <DataTable columns={columns} data={trainings} actions={actions} />
            )}

            {/* Modal d’ajout */}
            <Modal isOpen={isAddModalOpen} onClose={() => { setIsAddModalOpen(false); resetForm(); }} className="max-w-2xl p-6">
                <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Ajouter une formation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onValidationChange={(valid) => setIsTitleValid(valid)}
                            placeholder="Titre"
                            regex={/.{3,}/}
                            errorMessage="Le titre doit avoir au moins 3 caractères"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description *</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onValidationChange={(valid) => setIsDescriptionValid(valid)}
                            placeholder="Description"
                            regex={/.{5,}/}
                            errorMessage="La description doit avoir au moins 5 caractères"
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Date de début *</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            onValidationChange={(valid) => setIsStartDateValid(valid)}
                            min={today}
                            regex={/.+/}
                            errorMessage="La date de début doit être aujourd’hui ou après"
                        />
                    </div>
                    <div>
                        <Label htmlFor="durationWeeks">Durée (semaines) *</Label>
                        <Input
                            id="durationWeeks"
                            type="number"
                            value={durationWeeks}
                            onChange={(e) => setDurationWeeks(e.target.value)}
                            onValidationChange={(valid) => setIsDurationValid(valid)}
                            min="1"
                            regex={/^[1-9]\d*$/}
                            errorMessage="La durée doit être un entier positif"
                        />
                    </div>
                    <div>
                        <Label htmlFor="price">Prix (Ar) *</Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onValidationChange={(valid) => setIsPriceValid(valid)}
                            min="0"
                            step="0.01"
                            regex={/^\d+(\.\d{1,2})?$/}
                            errorMessage="Le prix doit être un nombre valide"
                        />
                    </div>
                    <div>
                        <Label htmlFor="categoryId">Catégorie *</Label>
                        <Select
                            options={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
                            value={categoryId}
                            onChange={(value) => {
                                setCategoryId(value);
                                setIsCategoryValid(!!value);
                            }}
                            placeholder="Sélectionner une catégorie"
                        />
                        {!isCategoryValid && <p className="text-xs text-red-500 mt-1">La catégorie est requise</p>}
                    </div>
                    <div>
                        <Label htmlFor="registrationEndDate">Date de fin d’inscription *</Label>
                        <Input
                            id="registrationEndDate"
                            type="date"
                            value={registrationEndDate}
                            onChange={(e) => setRegistrationEndDate(e.target.value)}
                            onValidationChange={(valid) => setIsRegistrationEndDateValid(valid)}
                            min={today} // Restriction à aujourd’hui ou après
                            regex={/.+/}
                            errorMessage="La date de fin d’inscription doit être aujourd’hui ou après"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" size="sm" onClick={() => { setIsAddModalOpen(false); resetForm(); }}>
                        Annuler
                    </Button>
                    <Button size="sm" onClick={handleAddTraining} disabled={!isFormValid}>
                        Ajouter
                    </Button>
                </div>
            </Modal>

            {/* Modal de modification */}
            <Modal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); resetForm(); }} className="max-w-2xl p-6">
                <h4 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Modifier la formation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onValidationChange={(valid) => setIsTitleValid(valid)}
                            placeholder="Titre"
                            regex={/.{3,}/}
                            errorMessage="Le titre doit avoir au moins 3 caractères"
                        />
                    </div>
                    <div>
                        <Label htmlFor="description">Description *</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onValidationChange={(valid) => setIsDescriptionValid(valid)}
                            placeholder="Description"
                            regex={/.{5,}/}
                            errorMessage="La description doit avoir au moins 5 caractères"
                        />
                    </div>
                    <div>
                        <Label htmlFor="startDate">Date de début *</Label>
                        <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            onValidationChange={(valid) => setIsStartDateValid(valid)}
                            min={today}
                            regex={/.+/}
                            errorMessage="La date de début doit être aujourd’hui ou après"
                        />
                    </div>
                    <div>
                        <Label htmlFor="durationWeeks">Durée (semaines) *</Label>
                        <Input
                            id="durationWeeks"
                            type="number"
                            value={durationWeeks}
                            onChange={(e) => setDurationWeeks(e.target.value)}
                            onValidationChange={(valid) => setIsDurationValid(valid)}
                            min="1"
                            regex={/^[1-9]\d*$/}
                            errorMessage="La durée doit être un entier positif"
                        />
                    </div>
                    <div>
                        <Label htmlFor="price">Prix (Ar) *</Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onValidationChange={(valid) => setIsPriceValid(valid)}
                            min="0"
                            step="0.01"
                            regex={/^\d+(\.\d{1,2})?$/}
                            errorMessage="Le prix doit être un nombre valide"
                        />
                    </div>
                    <div>
                        <Label htmlFor="categoryId">Catégorie *</Label>
                        <Select
                            options={categories.map((cat) => ({ value: cat.id.toString(), label: cat.name }))}
                            value={categoryId} // La valeur est bien chargée ici
                            onChange={(value) => {
                                setCategoryId(value);
                                setIsCategoryValid(!!value);
                            }}
                            placeholder="Sélectionner une catégorie"
                        />
                        {!isCategoryValid && <p className="text-xs text-red-500 mt-1">La catégorie est requise</p>}
                    </div>
                    <div>
                        <Label htmlFor="registrationEndDate">Date de fin d’inscription *</Label>
                        <Input
                            id="registrationEndDate"
                            type="date"
                            value={registrationEndDate}
                            onChange={(e) => setRegistrationEndDate(e.target.value)}
                            onValidationChange={(valid) => setIsRegistrationEndDateValid(valid)}
                            min={today} // Restriction à aujourd’hui ou après
                            regex={/.+/}
                            errorMessage="La date de fin d’inscription doit être aujourd’hui ou après"
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" size="sm" onClick={() => { setIsEditModalOpen(false); resetForm(); }}>
                        Annuler
                    </Button>
                    <Button size="sm" onClick={handleEditTraining} disabled={!isFormValid}>
                        Sauvegarder
                    </Button>
                </div>
            </Modal>

            {/* Modal de confirmation */}
            <ConfirmModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleDeleteTraining}
                message="Êtes-vous sûr de vouloir supprimer cette formation ?"
            />

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default TrainingManager;