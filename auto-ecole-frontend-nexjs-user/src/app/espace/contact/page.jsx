// app/contact/page.tsx
'use client';
import { EnvelopeIcon, ChatBubbleLeftRightIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Layout from "@/components/ui/Layout";

export default function ContactPage() {
  return (
    <Layout>
    <div className="min-h-screen bg-background-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-theme-f mb-4">Contactez Notre Équipe</h1>
            <p className="text-lg text-gray-600">Nous sommes à votre disposition pour toute question</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
            {/* Section Coordonnées */}
            <div className="bg-background-200  rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-gray-400 mb-6 flex items-center gap-2">
                <MapPinIcon className="w-6 h-6 text-blue-600" />
                Nos Coordonnées
                </h2>
                
                <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <EnvelopeIcon className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                    <p className="font-medium text-gray-300">Email</p>
                    <p className="text-gray-600">contact@autoecole.ma</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <PhoneIcon className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                    <p className="font-medium text-gray-300">Téléphone</p>
                    <p className="text-gray-600">+212 5 22 34 56 78</p>
                    </div>
                </div>

                <div className="flex items-start gap-4">
                    <MapPinIcon className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                    <p className="font-medium text-gray-300">Adresse</p>
                    <p className="text-gray-600">
                        123 Avenue Mohammed VI<br/>
                        Casablanca, Maroc
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* Section Options de Contact */}
            <div className="space-y-8">
                {/* Option Email */}
                <div className="bg-background-200 rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                    <EnvelopeIcon className="w-8 h-8 text-theme-f" />
                    <h3 className="text-xl font-semibold text-gray-400">Par Email</h3>
                </div>
                <p className="text-gray-600">
                    Envoyez-nous un email à l'adresse ci-contre et nous vous répondrons 
                    dans les plus brefs délais.
                </p>
                </div>

                {/* Option Message Direct */}
                <div className="bg-background-200  rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-4 mb-4">
                    <ChatBubbleLeftRightIcon className="w-8 h-8 text-green-600" />
                    <h3 className="text-xl font-semibold text-gray-400">Messagerie Directe</h3>
                </div>
                <p className="text-gray-600">
                    Contactez-nous via nos réseaux sociaux :
                    <div className="flex gap-4 mt-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a>
                    <a href="#" className="text-pink-600 hover:text-pink-800">Instagram</a>
                    <a href="#" className="text-gray-600 hover:text-gray-800">LinkedIn</a>
                    </div>
                </p>
                </div>
            </div>
            </div>
        </div>
        </div>
    </Layout>
   
  );
}