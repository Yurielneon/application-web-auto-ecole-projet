"use client";

import { TrainingProvider } from "@/contexts/TrainingContext";
import TrainingManager from "@/components/features/training/TrainingManager";

export default function TrainingsPage() {
    return (
        <TrainingProvider>
            <TrainingManager />
        </TrainingProvider>
    );
}