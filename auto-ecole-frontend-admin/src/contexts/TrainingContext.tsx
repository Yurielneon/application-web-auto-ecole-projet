"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchActiveTrainings, createTraining, updateTraining, deleteTraining, fetchCategories } from "@/lib/api/trainingApi";
import { Training } from "@/types/training";

interface TrainingContextType {
    trainings: Training[];
    categories: { id: number; name: string }[];
    loading: boolean;
    error: string | null;
    fetchAllTrainings: () => Promise<void>;
    addTraining: (data: any) => Promise<void>;
    editTraining: (id: number, data: any) => Promise<void>;
    removeTraining: (id: number) => Promise<void>;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllTrainings = async () => {
        try {
            setLoading(true);
            const data = await fetchActiveTrainings();
            setTrainings(data.trainings);
            setError(null);
        } catch (err) {
            setError("Erreur lors de la récupération des formations.");
        } finally {
            setLoading(false);
        }
    };

    const fetchAllCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des catégories :", err);
        }
    };

    const addTraining = async (data: any) => {
        try {
            const response = await createTraining(data);
            setTrainings((prev) => [...prev, response.training]); 
            setError(null);
        } catch (err) {
            throw err;
        }
    };

    const editTraining = async (id: number, data: any) => {
        try {
            const response = await updateTraining(id, data);
            setTrainings((prev) =>
                prev.map((training) => (training.id === id ? response.training : training))
            );
            setError(null);
        } catch (err) {
            throw err;
        }
    };

    const removeTraining = async (id: number) => {
        try {
            await deleteTraining(id);
            setTrainings((prev) => prev.filter((training) => training.id !== id));
            setError(null);
        } catch (err) {
            throw err;
        }
    };

    useEffect(() => {
        fetchAllTrainings();
        fetchAllCategories();
    }, []);

    return (
        <TrainingContext.Provider
            value={{ trainings, categories, loading, error, fetchAllTrainings, addTraining, editTraining, removeTraining }}
        >
            {children}
        </TrainingContext.Provider>
    );
};

export const useTraining = (): TrainingContextType => {
    const context = useContext(TrainingContext);
    if (!context) throw new Error("useTraining must be used within a TrainingProvider");
    return context;
};