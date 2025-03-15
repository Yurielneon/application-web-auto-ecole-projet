'use client';
import { use, useState } from 'react';
import Layout from "@/components/ui/Layout";

export default function Information({ params }) {
    const {id} = use(params);
  const [user] = useState({
    id: id,
    last_name: "Doe",
    first_name: "John",
    email: "john@autoecole.ma",
    cin: "AB123456",
    birth_date: "2000-01-01",
    training: {
      title: "Permis B Accéléré",
      price: 4500,
      start_date: "2023-09-01",
      duration_weeks: 8
    },
    status: "validated",
    payment_receipt: "PAY-2023-1234",
    documents: [
      { name: "Certificat Résidence", file: "residence.pdf" },
      { name: "Reçu Paiement", file: "payment.pdf" }
    ]
  });

  const generatePDF = async () => {
    try {
      const response = await fetch(`/api/generate-pdf?studentId=${user.id}`);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attestation.pdf';
      a.click();
    } catch (error) {
      console.error('Erreur de génération:', error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background-200 p-8">
        <div className="max-w-4xl mx-auto bg-background-100 rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">
              <span className="bg-indigo-100 px-3 py-1 rounded-lg">👤</span>
              Profil de {user.last_name}
            </h1>
            <div className="flex gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <EditIcon />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg text-red-500">
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Section title="Identité">
              <InfoItem label="Nom" value={user.last_name} />
              <InfoItem label="Prénom" value={user.first_name} />
              <InfoItem label="CIN" value={user.cin} />
              <InfoItem 
                label="Date de Naissance" 
                value={new Date(user.birth_date).toLocaleDateString()} 
              />
            </Section>

            <Section title="Formation">
              <InfoItem label="Programme" value={user.training.title} />
              <InfoItem label="Prix" value={`${user.training.price} DH`} />
              <InfoItem 
                label="Statut" 
                value={
                  <span className={`px-2 py-1 rounded ${user.status === 'validated' ? 
                    'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {user.status}
                  </span>
                } 
              />
            </Section>

            <Section title="Documents">
              <div className="space-y-2">
                {user.documents.map((doc, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="flex items-center gap-2 text-indigo-600 hover:underline"
                  >
                    <DocumentIcon />
                    {doc.name}
                  </a>
                ))}
              </div>
            </Section>
          </div>

          <div className="mt-8 border-t pt-6">
            <button 
              onClick={generatePDF}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 flex items-center gap-2 w-fit"
            >
              📥 Télécharger l'Attestation
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Composants UI
const Section = ({ title, children }) => (
  <div className="bg-background-200 p-5 rounded-xl">
    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-theme-f">
      <span className="bg-theme-f p-2 rounded-lg">📁</span>
      {title}
    </h3>
    {children}
  </div>
);

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

// Icônes SVG
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);