// app/notification/page.tsx
'use client';
import { CheckCircleIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/ui/Layout";

export default function NotificationPage() {
  return (
    <Layout>
    <div className="min-h-screen bg-background-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-background-100 rounded-xl shadow-lg p-8 text-center">
        {/* Icône principale */}
        <div className="flex justify-center mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-600 animate-bounce" />
        </div>

        {/* Titre */}
        <h1 className="text-2xl font-bold text-gray-400 mb-4">
          Résultats d'Examen Disponibles
        </h1>

        {/* Message principal */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            Votre résultat d'examen a été traité avec succès !
          </p>
          
          <div className="inline-flex items-center gap-2 bg-theme-t p-4 rounded-lg">
            <EnvelopeIcon className="w-6 h-6 text-gray-200" />
            <span className="text-gary-200 font-medium">
              Vous recevrez les résultats par email dans les 24h
            </span>
          </div>
        </div>

        {/* Détails supplémentaires */}
        <div className="border-t pt-6 text-sm text-gray-500">
          <p className="mb-2">
            Vérifiez votre boîte de réception et le dossier spam
          </p>
          <p>Email de notification :</p>
          <p className="font-medium text-gray-700">haingonirina.rh7@gmail.com</p>
        </div>

        {/* Barre de statut (optionnel) */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <div className="h-1 w-8 bg-green-600 rounded-full"></div>
          <div className="h-1 w-8 bg-green-600 rounded-full"></div>
          <div className="h-1 w-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
    </Layout>

  );
}