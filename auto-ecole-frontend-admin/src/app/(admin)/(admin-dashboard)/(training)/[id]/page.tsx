"use client";

import React, { useState, useEffect } from "react";
import { fetchTraining } from "@/lib/api/trainingApi";

const TrainingDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const [training, setTraining] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTraining = async () => {
            try {
                const data = await fetchTraining(parseInt(params.id));
                setTraining(data);
            } catch (err) {
                console.error("Erreur lors du chargement de la formation :", err);
            } finally {
                setLoading(false);
            }
        };
        loadTraining();
    }, [params.id]);

    if (loading) return <p>Chargement...</p>;
    if (!training) return <p>Formation non trouvée.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{training.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Description :</strong> {training.description}</p>
                <p><strong>Catégorie :</strong> {training.category.name}</p>
                <p><strong>Date de début :</strong> {training.start_date}</p>
                <p><strong>Durée :</strong> {training.duration_weeks} semaines</p>
                <p><strong>Prix :</strong> {training.price} €</p>
                <p><strong>Date de fin d’inscription :</strong> {training.registration_end_date}</p>
                {training.schedule && <p><strong>Programme :</strong> {JSON.stringify(training.schedule)}</p>}
            </div>
        </div>
    );
};

export default TrainingDetail;