import axios from "axios";
import { Training } from "@/types/training";

const api = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: { "Content-Type": "application/json" },
});

// Récupérer les formations en cours
export const fetchTrainings = () =>
    api.get<{ data: Training[] }>("/trainings").then((res) => res.data);

// Récupérer toutes les catégories
export const fetchCategories = () =>
    api.get<{ id: number; name: string }[]>("/categories").then((res) => res.data);

// Créer une formation
export const createTraining = (data: any) =>
    api.post<{ training: Training; message: string }>("/trainings", data).then((res) => res.data).catch((err) => {
        throw err.response?.data || { message: "Erreur lors de la création" };
    });

// Mettre à jour une formation
export const updateTraining = (id: number, data: any) =>
    api.put<{ training: Training; message: string }>(`/trainings/${id}`, data).then((res) => res.data).catch((err) => {
        throw err.response?.data || { message: "Erreur lors de la mise à jour" };
    });

// Supprimer une formation
export const deleteTraining = (id: number) =>
    api.delete<{ message: string }>(`/trainings/${id}`).then((res) => res.data).catch((err) => {
        throw err.response?.data || { message: "Erreur lors de la suppression" };
    });

// Récupérer une formation spécifique
export const fetchTraining = (id: number) =>
    api.get<Training>(`/trainings/${id}`).then((res) => res.data);

// Récupérer toutes les formations en cours sans pagination
export const fetchActiveTrainings = () =>
    api.get<{ trainings: Training[] }>("/trainings/active").then((res) => res.data);