"use client"

import { useForm } from 'react-hook-form'
import { useState, use, useEffect } from 'react'
import { PhotoIcon, DocumentIcon, BanknotesIcon } from '@heroicons/react/24/outline'
import Header from "@/components/ui/Header"
import FormSection from '@/components/ui/FormSection'
import FileUpload from '@/components/ui/FileUpload'
import DatePicker from '@/components/ui/DatePicker'
import axios from 'axios'


export default function Inscription({params}) {
  const {training_id} = use(params);
  const { register, handleSubmit, control, formState: { errors } } = useForm()
  const [filePreviews, setFilePreviews] = useState({})

  const handleFilePreview = (name, file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setFilePreviews(prev => ({
        ...prev,
        [name]: file.type.startsWith('image/') ? e.target.result : file.name
      }))
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    for (const key in data) {
      if (key === "birth_date" && data[key] instanceof Date) {
        // Convertir en format "YYYY-MM-DD"
        formData.append(key, data[key].toISOString().split("T")[0]);

      } else 
      if (data[key] instanceof FileList) {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    alert(formData.get("birth_date"))
    // console.log(formData.get("birth_date"))

    try {
      const response = await axios.post("http://localhost:8000/api/students", formData,
        { headers: { 'Content-Type': "multipart/form-data" }}
      )

      console.log(response.data)
      alert("Inscription avec succès")

    } catch (error) {
      console.error(error)
    } 

  }


  return (
    <main className="min-h-screen bg-background-100 from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Devenez un conducteur accompli
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Complétez votre inscription en 3 étapes simples
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormSection 
            title="Informations personnelles"
            icon={<PhotoIcon className="h-6 w-6" />}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Photo de profil</label>
                <FileUpload
                  accept="image/*"
                  {...register('profile_picture', { required: true })}
                  onChange={(e) => handleFilePreview('profile_picture', e.target.files[0])}
                  preview={filePreviews.profile_picture}
                />
                {errors.profile_picture && <span className="text-red-500 text-sm">Requis</span>}
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    {...register('last_name', { required: true })}
                    placeholder="Nom de famille"
                    className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                  />
                  {errors.last_name && <span className="text-red-500 text-sm">Requis</span>}
                </div>

                <div>
                  <input
                    {...register('first_name')}
                    placeholder="Prénom (optionnel)"
                    className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Coordonnées"
            icon={<DocumentIcon className="h-6 w-6" />}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Adresse email (optionnel)"
                  className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                />
              </div>

              <div>
                <input
                  type="tel"
                  {...register('phone', { pattern: /^[0-9]{10}$/ })}
                  placeholder="Téléphone"
                  className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                />
                {errors.phone && <span className="text-red-500 text-sm">Format invalide</span>}
              </div>

              <div>
                <input
                  {...register('cin', { minLength: 12, maxLength: 12 })}
                  placeholder="Numéro CIN"
                  className="form-input-rounded bg-background-100 px-3 py-2 rounded-xl"
                />
                {errors.cin && <span className="text-red-500 text-sm">12 caractères requis</span>}
              </div>

              <div>
                <DatePicker
                  name="birth_date"
                  control={control}
                  placeholder="Date de naissance"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="1"
                    {...register('gender')}
                    className="form-radio-rounded"
                  />
                  <span className="ml-2">Homme</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="2"
                    {...register('gender')}
                    className="form-radio-rounded"
                  />
                  <span className="ml-2">Femme</span>
                </label>
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Documents requis"
            icon={<DocumentIcon className="h-6 w-6" />}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Certificat de résidence</label>
                <FileUpload
                  accept=".pdf,.doc,.docx"
                  {...register('residence_certificate', { required: true })}
                  onChange={(e) => handleFilePreview('residence_certificate', e.target.files[0])}
                  preview={filePreviews.residence_certificate}
                />
                {errors.residence_certificate && <span className="text-red-500 text-sm">Requis</span>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permis précédent (optionnel)</label>
                <FileUpload
                  accept="image/*,.pdf"
                  {...register('previous_license')}
                  onChange={(e) => handleFilePreview('previous_license', e.target.files[0])}
                  preview={filePreviews.previous_license}
                />
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Paiement"
            icon={<BanknotesIcon className="h-6 w-6" />}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Reçu de paiement</label>
                <FileUpload
                  accept="image/*,.pdf"
                  {...register('payment_receipt', { required: true })}
                  onChange={(e) => handleFilePreview('payment_receipt', e.target.files[0])}
                  preview={filePreviews.payment_receipt}
                />
                {errors.payment_receipt && <span className="text-red-500 text-sm">Requis</span>}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg animate-pulse">
                <p className="text-sm text-blue-800">
                  ⏳ Votre inscription sera activée après vérification par notre équipe.
                  Comptez 24 à 48 heures pour recevoir votre confirmation par email.
                </p>
              </div>
            </div>
          </FormSection>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          >
            Finaliser l'inscription
          </button>
        </form>
      </div>
    </main>
  )
}